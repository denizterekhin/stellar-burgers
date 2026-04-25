import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from '../actions/ingredientsAction';

export type TIngredientsState = {
  ingredients: Array<TIngredient>;
  isIngredientsLoading: boolean;
  error: string | null | undefined;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      });
  },
  selectors: {
    getIngredientsWithSelector: (state) => state.ingredients,
    getLoadingStatus: (state) => state.isIngredientsLoading
  }
});

export default ingredientsSlice;
export const { getIngredientsWithSelector, getLoadingStatus } =
  ingredientsSlice.selectors;
