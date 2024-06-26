import { AuthState, AuthActionTypes, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './types/auth';

const initialState: AuthState = {
  currentUser: null,
  error: null,
  loading: false,
  auth: null, // Убедитесь, что это здесь
  db: null // Добавьте это свойство
};

export function authReducer(state = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...state, currentUser: action.payload, error: null, loading: false };
    case LOGIN_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case LOGOUT:
      return { ...state, currentUser: null, loading: false };
    default:
      return state;
  }
}
