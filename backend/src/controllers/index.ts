import { MembersController } from "./members.controller.js";
import { UserController } from "./user.controller.js";

const membersController = new MembersController();
const userController = new UserController();
export {
  membersController,
  userController
}