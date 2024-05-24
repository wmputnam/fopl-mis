export const bIsLoggedIn = Symbol('isLoggedIn');

export interface IUser {
  [bIsLoggedIn]: boolean;
  isLoggedIn: () => boolean;
  logIn: () => void;
  logOut: () => void;
}