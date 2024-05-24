import { type IUser, bIsLoggedIn } from "./IUser.js";


class User implements IUser {
  private static user: User;
  // private user: IUser;

  [bIsLoggedIn]: boolean;

  private constructor() {

    this[bIsLoggedIn] = false;
  }


  isLoggedIn() { return this[bIsLoggedIn] };

  logIn(): void {
    this[bIsLoggedIn] = true;
  }

  logOut(): void {
    this[bIsLoggedIn] = false;
  }
  public static getUser(): User {
    if (this.user === undefined) {
      this.user = new User();
    }
    return this.user;
  }
}



export { User };