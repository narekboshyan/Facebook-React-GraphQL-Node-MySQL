import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

const initialState = {
  data: [],
  loading: {},
  headerFixed: true,
  headerShadow: true
};

export const sharedSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    addSnackbar: (state, { payload }) => {
      const snackBarItem = { ...payload, id: v4() };
      state.data = [...state.data, snackBarItem];
    },
    removeSnackbar: (state, action) => {
      state.data = state.data.filter(item => item.id !== action.payload);
    },
    addLoadingData: (state, action) => {
      state.loading = action.payload;
    },
    removeLoadingData: (state, action) => {
      if (state.loading.key === action.payload) {
        state.loading = {};
      }
    },
    setHeaderFixed: (state, action) => {
      state.headerFixed = action.payload;
    },
    setHeaderShadow: (state, action) => {
      state.headerShadow = action.payload;
    }
  }
});

export const {
  addSnackbar,
  removeSnackbar,
  addLoadingData,
  removeLoadingData,
  setHeaderFixed,
  setHeaderShadow
} = sharedSlice.actions;

export default sharedSlice.reducer;
