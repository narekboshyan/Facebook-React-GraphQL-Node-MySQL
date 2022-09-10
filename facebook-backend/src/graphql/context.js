import { prisma } from '../services/Prisma.js';
import { ERROR_MESSAGES } from '../constants/errors.js';
import { getUserId } from '../utils/auth.js';
import { InvalidDataError } from '../errors/InvalidDataError.js';
import { defaultRoles, operationNamesToPermissions } from '../constants/roles.js';
import { PermissionDeniedError } from '../errors/PermissionDeniedError.js';

const getUnAuthenticatedContext = async (operationName, userId) => {
  if (operationName === 'getMe') {
    if (!userId) {
      throw new InvalidDataError(ERROR_MESSAGES.invalidToken);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new InvalidDataError(ERROR_MESSAGES.invalidToken);
    }
    return {
      prisma,
      user,
      operationName,
    };
  }
  return {
    prisma,
    operationName,
  };
};

const context = async ({ ctx }) => {
  try {
    const { operationName, variables } = ctx.request.body;

    if (operationName === 'IntrospectionQuery' && process.env.NODE_ENV === 'development') {
      return { prisma };
    }

    const userId =
      (ctx.request.headers && ctx.request.headers.authorization) || ctx.request.query.token
        ? getUserId(ctx.request, ctx.request.query.token)
        : null;

    const { unAuthenticated } = operationNamesToPermissions[operationName] || {};

    if (unAuthenticated) {
      const unAuthenticatedContext = await getUnAuthenticatedContext(operationName, userId);
      return unAuthenticatedContext;
    }

    if (!userId) {
      throw new InvalidDataError(ERROR_MESSAGES.invalidToken);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new InvalidDataError(ERROR_MESSAGES.invalidUserId);
    }

    const isPermitted = defaultRoles.find((role) => role.id === user.role).permissions;
    if (isPermitted[operationNamesToPermissions[operationName]]) {
      throw new PermissionDeniedError(
        "Validation failed. Admin doesn't have permission to this action"
      );
    }

    const selectedCompanyCardCode = user.companyUsersData?.find(
      (comp) => comp.companyName === variables.selectedCompany
    )?.companyId;

    return {
      prisma,
      user,
      selectedCompanyCardCode,
    };
  } catch (error) {
    console.log(error);
    return { contextError: error };
  }
};

export { context };
