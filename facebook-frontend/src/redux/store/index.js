import { configureStore } from '@reduxjs/toolkit';
import { common, sidebar, user, permissions } from '../slices';

export const store = configureStore({
  reducer: {
    common,
    sidebar,
    user,
    permissions
  }
});
