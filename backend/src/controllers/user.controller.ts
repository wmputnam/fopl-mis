import express from "express";
import { User } from "../user/index.js";

export class UserController {

  loginAction(req: express.Request, res: express.Response) {
    const user = User.getUser();
    user.logIn();
    res.status(200).send({ success: true, message: "" });
  }

  logoutAction(req: express.Request, res: express.Response) {
    const user = User.getUser();
    user.logOut();
    res.status(200).send({ success: true, message: "" });
  }

  userInfoAction(req: express.Request, res: express.Response) {
    const user = User.getUser();
    const messg = user.isLoggedIn() ? "Logged in" : "Not logged in";
    res.status(200).send({ status: user.isLoggedIn(), message: messg });
  }

}

