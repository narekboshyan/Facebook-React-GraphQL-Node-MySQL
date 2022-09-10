import { allowedRoles } from 'constants/index';

export const allowedRoutes = userPermissions => {
  allowedRoles
    .map(role => {
      const existingPermission = role.actions.find(perm =>
        userPermissions.find(userPerm => userPerm === perm)
      );
      if (existingPermission) {
        return role.route;
      }
    })
    .filter(route => route);
};
