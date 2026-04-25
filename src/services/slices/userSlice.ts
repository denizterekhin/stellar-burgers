import { TUser } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import {
  userApi,
  registerUser,
  loginUser,
  logoutUser,
  updateUser
} from '../actions/userAction';
import { deleteCookie } from '../../utils/cookie';

export type TStateUser = {
  isAuthChecked: boolean; //статус проверки токена пользователя
  isAuthenticated: boolean;
  user: TUser | null; //null при отсутствии авторизации
  loginUserError: null | string; // ошибка логина при наличаи
  loginUserRequest: boolean; // состояниt запроса логина
};

const initialState: TStateUser = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserError: null,
  loginUserRequest: false
};

export const userSlice = createSlice({
  name: 'userstate',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userApi.pending, (state) => {
        state.isAuthenticated = false;
        state.loginUserError = null;
        state.user = null;
        state.loginUserRequest = true;
      })
      .addCase(userApi.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
      })
      .addCase(userApi.rejected, (state, action) => {
        state.loginUserError =
          action.error.message || 'Ошибка получения данных пользователя';
        state.isAuthenticated = false;
        state.user = null;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loginUserRequest = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loginUserRequest = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserError =
          action.error.message ||
          'Ошибка получения данных зарегистрированного пользователя ';
        state.loginUserRequest = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginUserError = null;
        state.loginUserRequest = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError =
          action.error.message ||
          'Ошибка, ненайден пользователь, вошедшего в систему ';
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isAuthenticated = true;
        state.loginUserRequest = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserRequest = false;
        state.user = null;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserRequest = false;
        state.loginUserError =
          action.error.message ||
          'Ошибка, ненайден пользователь, вышедший из системы ';
      })
      .addCase(updateUser.pending, (state) => {
        state.isAuthenticated = true;
        state.loginUserRequest = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loginUserRequest = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loginUserError =
          action.error.message || 'Ошибка обновления пользователя';
        state.loginUserRequest = false;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectLoginUserError: (state) => state.loginUserError,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectloginUserRequest: (state) => state.loginUserRequest
  }
});

export const { authChecked } = userSlice.actions;

export const {
  selectUser,
  selectIsAuthenticated,
  selectLoginUserError,
  selectIsAuthChecked,
  selectloginUserRequest
} = userSlice.selectors;

export default userSlice;
