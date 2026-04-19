import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';

export const ordersHistory = createAsyncThunk(
  'user/orderHistory',
  getOrdersApi
);
