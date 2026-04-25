import { TOrder } from '@utils-types';
import { ordersHistory } from '../actions/ordersUserHistoryAction';
import { createSlice } from '@reduxjs/toolkit';

export type TStateOrderUserHistory = {
  orders: TOrder[];
  loading: boolean;
  error: null | string | undefined;
};

const initialState: TStateOrderUserHistory = {
  orders: [],
  loading: false,
  error: null
};

export const orderUserHistorySlice = createSlice({
  name: 'ordershistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ordersHistory.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(ordersHistory.fulfilled, (state, action) => {
        (state.orders = action.payload),
          (state.loading = false),
          (state.error = null);
      })
      .addCase(ordersHistory.rejected, (state, action) => {
        (state.error = action.error.message || 'Ошибка в истории заказов'),
          (state.loading = false);
      });
  },
  selectors: {
    getUserOrdersHistory: (state) => state.orders,
    getUserOrdersHistoryError: (state) => state.error,
    getUserOrdersLoading: (state) => state.loading
  }
});

export const {
  getUserOrdersHistory,
  getUserOrdersHistoryError,
  getUserOrdersLoading
} = orderUserHistorySlice.selectors;

export default orderUserHistorySlice;
