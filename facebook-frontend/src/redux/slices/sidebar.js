import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarShadow: false,
  sidebarFixed: true,
  sidebarToggleMobile: false,
  sidebarFooter: true,
  sidebarUserbox: true,
  sidebarToggle: false,
  sidebarHover: false
};

export const sidebarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSidebarToggle: (state, action) => {
      state.sidebarToggle = action.payload;
    },
    setSidebarShadow: (state, action) => {
      state.sidebarShadow = action.payload;
    },
    setSidebarFixed: (state, action) => {
      state.sidebarFixed = action.payload;
    },
    setSidebarToggleMobile: (state, action) => {
      state.sidebarToggleMobile = action.payload;
    },
    setSidebarFooter: (state, action) => {
      state.sidebarFooter = action.payload;
    },
    setSidebarHover: (state, action) => {
      state.sidebarHover = action.payload;
    },
    setSidebarUserbox: (state, action) => {
      state.sidebarUserbox = action.payload;
    }
  }
});

export const {
  setSidebarToggle,
  setSidebarShadow,
  setSidebarFixed,
  setSidebarToggleMobile,
  setSidebarFooter,
  setSidebarHover,
  setSidebarUserbox
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
