import { createSlice } from '@reduxjs/toolkit';
import { setItemToLocalStorage } from 'utils';

const initialState = {
  allowedRoutes: [],
  permissions: [],
  permissionDenied: false,
  allowedUserPages: []
};
export const permissionSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    addAllowedRoutes: (state, { payload }) => {
      state.allowedRoutes = payload;
    },
    allowedPages: (state, { payload }) => {
      const userPermissionsToView = payload;
      const userViewPermissions = Object.keys(userPermissionsToView || {}).filter(
        key => userPermissionsToView[key]
      );
      state.permissions = userViewPermissions;

      const allowedRoutes = setItemToLocalStorage(
        'userPermissoins',
        JSON.stringify(['/orders', '/invoices', '/quotes'])
      );
      state.allowedUserPages = allowedRoutes;
    }
  }
});

export const { addAllowedRoutes, allowedPages } = permissionSlice.actions;

export default permissionSlice.reducer;
