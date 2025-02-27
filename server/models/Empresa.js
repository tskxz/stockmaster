const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const empresaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  role: { type: String, enum: ["empresa", "admin"], default: "empresa" },
  password: { 
    type: String, 
    required: [true, "A senha é obrigatória."], 
    minLength: [8, "A senha deve ter pelo menos 8 caracteres."], 
    select: false 
  },
  passwordConfirm: {
    type: String,
    required: [true, "É necessário confirmar a senha."],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "As senhas não coincidem.",
    },
    select: false,
  },
  active: { type: Boolean, default: true, select: false },
  image : { type: String, default: "default.png"}
});

empresaSchema.pre("save", async function (next) {
  // only run this function if password was actually changed
  if (!this.isModified("password")) return next();

  // hash the password
  this.password = await bcrypt.hash(this.password, 12);

  // delete passwordConfirm field to avoid saving it in the database
  this.passwordConfirm = undefined;
  next();
});

empresaSchema.methods.correctPassword = async function (
  candidatePassword,
  empresaPassword
) {
  return await bcrypt.compare(candidatePassword, empresaPassword);
};

empresaSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const Empresa = mongoose.model("Empresa", empresaSchema);

module.exports = Empresa;