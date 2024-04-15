import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApplicationError from "../../middleware/handleError.middleware.js";
import UserRepository from "./user.repository.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signup(req, res, next) {
    try {
      const user = await this.userRepository.signup(req.body);
      if (user) {
        res.status(201).json({
          success: true,
          message: "User successfully created",
          data: user,
        });
      } else {
        throw new ApplicationError("User cannot be created", 400);
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async signin(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        throw new ApplicationError("Email and password are mandatory", 500);
      }
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new ApplicationError("Invalid credentials", 500);
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new ApplicationError("Invalid credentials", 500);
      } else {
        const token = jwt.sign(
          { userId: user._id, userRole: user.role },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
        // save the token in cookies and send
        res.cookie("authToken", token, {
          path: "/",
          maxAge: 2 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
          success: true,
          message: "User successfully logged in.",
          data: token,
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
