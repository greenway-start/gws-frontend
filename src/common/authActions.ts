import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './types/store';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './types/authTypes';

export const login = (auth: Auth, email: string, password: string): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch: any) => {
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
