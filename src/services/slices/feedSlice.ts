import { TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { getFeedData, getOrderByNum } from '../actions/feedAction';

type TStateFeed = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  modalOrder: TOrder | null;
  error: null | string;
};

const initialState: TStateFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  modalOrder: null,
  error: null
};

export const feedSlice = createSlice({
  name: 'feeddata',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      })
      .addCase(getFeedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка данных Feed';
      })
      .addCase(getOrderByNum.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNum.fulfilled, (state, action) => {
        state.loading = false;
        state.modalOrder = action.payload.orders[0];
      })
      .addCase(getOrderByNum.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка данных Feed';
      });
  },
  selectors: {
    getFeedOrders: (state) => state.orders,
    getTotalEmountOrders: (state) => state.total,
    getTotalEmountToday: (state) => state.totalToday,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    selectModalOrder: (state) => state.modalOrder
  }
});

export const {
  getFeedOrders,
  getTotalEmountOrders,
  getTotalEmountToday,
  getLoading,
  getError
} = feedSlice.selectors;

export default feedSlice;
