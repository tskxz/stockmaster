import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";
import "../styles/screens/error404screen.css";

export default function Error404() {
        return (
                <div className="error-404-page">
                        <motion.div
                                className="error-404-content"
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                        >
                                <motion.div
                                        className="error-404-icon"
                                        animate={{ rotate: [0, 5, -5, 5, 0] }}
                                        transition={{
                                                repeat: Number.POSITIVE_INFINITY,
                                                duration: 2,
                                        }}
                                >
                                        <AlertTriangle size={100} />
                                </motion.div>
                                <h1 className="error-404-title">404</h1>
                                <h2 className="error-404-subtitle">
                                        Oops! Page Not Found
                                </h2>
                                <p className="error-404-description">
                                        Sorry, the page you're looking for
                                        doesn't exist or has been moved.
                                </p>
                                <motion.a
                                        href="/"
                                        className="error-404-home-button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                >
                                        <Home size={20} />
                                        Back to Home
                                </motion.a>
                        </motion.div>
                </div>
        );
}
