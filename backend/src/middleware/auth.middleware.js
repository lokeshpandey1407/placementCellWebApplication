import jwt from "jsonwebtoken";
import ApplicationError from "./handleError.middleware.js";

const Auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // Check if the authorization header exists and contains a token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access. Please provide a valid JWT token.",
    });
  }

  // Extract the JWT token from the authorization header
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = payload.userId;
    req.userRole = payload.userRole;
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access. Please provide a valid JWT token.",
    });
  }
  next();
};
export default Auth;
