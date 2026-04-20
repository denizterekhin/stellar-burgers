import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response;
  }
);
