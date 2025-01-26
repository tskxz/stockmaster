const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Empresa = require("../models/Empresa");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (empresa, statusCode, res) => {
  const token = signToken(empresa._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  empresa.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      empresa,
    },
  });
};

exports.signup = async (req, res, next) => {
  try {
    const existingUser = await Empresa.findOne({email: req.body.email})
    console.log(existingUser)
    if(existingUser){
      return res.status(400).json({
        status: "fail",
        message: "Esse email já existe!"
      })
    }
    const newEmpresa = await Empresa.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      passwordChangedAt: req.body.passwordChangedAt,
      role: req.body.role,
    });
    createSendToken(newEmpresa, 200, res);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        status: "fail",
        message: messages.join(", "),
      });
    }
    // Passa outros erros para o middleware de erro global
    next(error);
  }
};


exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exists
  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Please provide a valid email and password",
    });
  }
  // check if empresa exists && password is correct
  const empresa = await Empresa.findOne({ email }).select("+password");

  if (!empresa || !(await empresa.correctPassword(password, empresa.password))) {
    return res.status(401).json({
      status: "error",
      message: "Incorrect email or password",
    });
  }
  // if all ok, send token to client
  const token = signToken(empresa._id);
  res.status(200).json({
    status: "success",
    token,
  });
};

exports.protect = async (req, res, next) => {
  // Getting token and check if its exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "You are not logged in, please login",
    });
  }

  // verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if empresa still exists
  const freshEmpresa = await Empresa.findById(decoded.id);
  if (!freshEmpresa) {
    return res.status(401).json({
      status: "error",
      message: "Empresa no longer exists",
    });
  }

  // check if empresa changed password after the token was issued
  if (freshEmpresa.changedPasswordAfter(decoded.iat)) {
    return res.status(401).json({
      status: "error",
      message: "Empresa recently changed password, please log in again",
    });
  }

  // Grant access to protected route
  req.empresa = freshEmpresa;
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'empresa']. role='empresa'
    if (!roles.includes(req.empresa.role)) {
      return res.status(403).json({
        status: "error",
        message: "You do not have permission to perform this action",
      });
    }

    next();
  };
};