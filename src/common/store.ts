import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './authReducer';
import { AuthState } from './authTypes';

export interface RootState {
  auth: AuthState;
}

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export default store;
