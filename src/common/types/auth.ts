import { Auth, User } from "firebase/auth";
import { Firestore } from "firebase/firestore"; // Добавьте это

export interface AuthState {
  currentUser: User | null;
  error: string | null;
  loading: boolean;
  auth: Auth | null; // Убедитесь, что это здесь
  db: Firestore | null; // Добавьте это свойство
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: User;
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes = LoginRequestAction | LoginSuccessAction | LoginFailureAction | LogoutAction;
