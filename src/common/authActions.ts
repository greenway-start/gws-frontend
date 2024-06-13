import { Auth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ThunkAction } from 'redux-thunk';
import { RootState } from './types/store';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './types/auth';
import { AnyAction } from 'redux';

type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export const login = (auth: Auth, email: string, password: string): AppThunk => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      console.log("Logging in with email:", email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful:", userCredential.user);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: userCredential.user,
      });
    } catch (error) {
      console.error("Login error:", error);
      dispatch({
        type: LOGIN_FAILURE,
        payload: "Ошибка входа. Проверьте ваш email и пароль.",
      });
    }
  };
};

export const logout = (auth: Auth): AppThunk => {
  return async (dispatch) => {
    try {
      console.log("Logging out");
      await signOut(auth);
      console.log("Logout successful");
      dispatch({ type: LOGOUT });
    } catch (error) {
      console.error("Ошибка выхода из системы:", error);
    }
  };
};
