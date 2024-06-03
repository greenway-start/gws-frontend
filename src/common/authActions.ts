import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { AppDispatch } from './store';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './authTypes';

export const login = (auth: Auth, email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: userCredential.user,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: "Ошибка входа. Проверьте ваш email и пароль.",
      });
    }
  };
};
