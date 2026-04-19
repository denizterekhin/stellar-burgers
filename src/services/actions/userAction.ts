import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { TRegisterData } from '@api';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';
import { authChecked } from '../slices/userSlice';

// асинхронный экшен получения данных пользователя
export const userApi = createAsyncThunk('user/userApi', getUserApi);

// асинхронный экшен регистрации пользователя в ЛК
export const registerUser = createAsyncThunk(
  'user/register',
  async ({ email, password, name }: TRegisterData) => {
    const data = await registerUserApi({ email, password, name });

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data.user;
  }
);

// асинхронный экшен входа пользователя в ЛК
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data.user;
  }
);

//асинхронный экшен выхода пользователя из ЛК
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.clear();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// асинхронный экшен обновление данных пользователя
export const updateUser = createAsyncThunk('user/update', updateUserApi);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(userApi()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);
