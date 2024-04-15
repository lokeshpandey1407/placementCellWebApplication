import express from "express";
import UserController from "./user.controller.js";

const UserRoute = express.Router();
const userController = new UserController();

UserRoute.post("/signup", (req, res, next) => {
  userController.signup(req, res, next);
});
UserRoute.post("/signin", (req, res, next) => {
  userController.signin(req, res, next);
});

export default UserRoute;
