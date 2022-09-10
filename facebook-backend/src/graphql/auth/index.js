import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthorizationError } from '../../errors/AuthorizationError.js';
import { InvalidDataError } from '../../errors/InvalidDataError.js';
import { ERROR_MESSAGES } from '../../constants/errors.js';
import { Email } from '../../services/Email.js';

import { generateRandomNumber } from '../../utils/helpers.js';
import { sapService } from '../../services/ServiceLayer/index.js';
import { config } from '../../constants/sap.js';
import { defaultRoles } from '../../constants/roles.js';
import { AuthenticationError } from '../../errors/AuthenticationError.js';
import { v4 } from 'uuid';

// *************************** QUERIES *****************************
export const getMe = async (_parent, _args, context) => {
  const user = context.user || null;
  if (!context.user) return null;
  const permissions = defaultRoles.find((u) => u.id === user.role).permissions;

  return { ...user, permissions };
};

// *************************** MUTATIONS ***************************
export const signin = async (_parent, args, context) => {
  await sapService.createSession(config);
  const user = await context.prisma.user.findUnique({
    where: {
      email: args.email,
    },
  });

  if (!user) {
    throw new AuthorizationError(ERROR_MESSAGES.invalidEmailOrPassword);
  }

  if (!user.confirmed) {
    await Email.sendConfirmationEmail(args.email, user.confirmationCode, user.firstName);
  }

  const valid = await bcrypt.compare(args.password, user.password);

  if (!valid) {
    throw new AuthorizationError(ERROR_MESSAGES.invalidEmailOrPassword);
  }
  const changePasswordId = generateRandomNumber(6).toString();
  await Email.sendForgotPasswordEmail(user.email, changePasswordId);

  await context.prisma.user.update({
    where: { email: user.email },
    data: {
      confirmationCode: +changePasswordId,
    },
  });

  return { confirmed: true };
};

export const twoFactorAuthentication = async (_parent, { confirmationCode }, context) => {
  const { prisma } = context;

  const user = await prisma.user.findUnique({
    where: { confirmationCode: +confirmationCode },
  });

  if (!user) {
    throw new AuthenticationError('Confirmation code is wrong');
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
  user.permissions = defaultRoles.find((u) => u.id === user.role).permissions;
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      confirmationCode: null,
    },
  });
  return { token, ...user };
};

export const signup = async (_parent, args, context) => {
  try {
    const { lastName, firstName, email, password } = args.signupData;
    const { prisma } = context;

    if (!validator.isEmail(email)) {
      throw new InvalidDataError(ERROR_MESSAGES.invalidEmail);
    } else if (
      validator.isEmpty(lastName) ||
      validator.isEmpty(firstName) ||
      !validator.isLength(password, { min: 4 })
    ) {
      throw new InvalidDataError(ERROR_MESSAGES.invalidData);
    }

    const existingConfirmedUser = await prisma.user.findMany({
      where: {
        email,
        confirmed: true,
      },
    });

    if (existingConfirmedUser?.length) {
      throw new AuthenticationError(ERROR_MESSAGES.userAlreadyExists);
    }

    const existingNotConfirmedUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const confirmationCode = generateRandomNumber(9);
    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingNotConfirmedUser) {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          firstName,
          lastName,
          email,
          confirmationCode,
          password: hashedPassword,
        },
      });
    } else {
      await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          role: 2,
          confirmationCode,
          password: hashedPassword,
        },
      });
    }

    await Email.sendConfirmationEmail(email, confirmationCode, firstName);

    const matchingBusinessCompanies = [];

    const matchUser = async (reqUrl) => {
      const businessPartners = await sapService.get(reqUrl, 10000);

      const allBusinessPartnersEmail = businessPartners.value?.filter(
        (bp) => bp['BusinessPartners/ContactEmployees'].E_Mail === email
      );

      if (allBusinessPartnersEmail) {
        matchingBusinessCompanies.push(...allBusinessPartnersEmail);
      }

      if (businessPartners['odata.nextLink'] && matchingBusinessCompanies.length < 10) {
        return matchUser(businessPartners['odata.nextLink'], email);
      }

      const firstTenCompanyIds = matchingBusinessCompanies
        .slice(0, matchingBusinessCompanies.length > 10 ? 10 : matchingBusinessCompanies.length)
        .map((comp) => comp.BusinessPartners.CardCode);

      if (!firstTenCompanyIds.length) return;

      let params = '';
      firstTenCompanyIds.forEach((id) => {
        params = params.concat(
          `(CardCode eq '${id}') ${
            firstTenCompanyIds[firstTenCompanyIds.length - 1] !== id ? 'or ' : ''
          }`
        );
      });
      const business = await sapService.get(
        `BusinessPartners?$filter=${params}&$select=CardCode,CardName`,
        10000
      );

      const companyUsersData = business.value.map(({ CardCode, CardName }) => {
        return {
          id: v4(),
          value: CardName,
          companyId: CardCode,
          companyName: CardName,
          permissions: {
            canReadOrders: false,
            canReadQuotes: true,
            canReadInvoices: false,
          },
        };
      });

      if (!companyUsersData.length) return;

      await prisma.user.update({
        where: {
          email,
        },
        data: {
          companyUsersData,
        },
      });
    };
    matchUser(
      `$crossjoin(BusinessPartners,BusinessPartners/ContactEmployees)?$expand=BusinessPartners($select=CardCode),BusinessPartners/ContactEmployees($select=E_Mail)`
    );

    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const confirmCode = async (_parent, { confirmationCode }, context) => {
  const { prisma } = context;

  try {
    const user = await prisma.user.findUnique({
      where: { confirmationCode: +confirmationCode },
    });

    if (!user) {
      throw new AuthenticationError('Confirmation code is not valid');
    }

    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const recoverPassword = async (_parent, { email }, context) => {
  const user = await context.prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new InvalidDataError(ERROR_MESSAGES.userNotFound);
  }

  const changePasswordId = generateRandomNumber(6).toString();
  await Email.sendForgotPasswordEmail(email, changePasswordId);
  await context.prisma.user.update({
    where: { email },
    data: {
      confirmationCode: +changePasswordId,
    },
  });
  return true;
};

export const emailConfirmation = async (_parent, { confirmationCode }, context) => {
  const { prisma } = context;

  try {
    const user = await prisma.user.update({
      where: { confirmationCode: +confirmationCode },
      data: {
        confirmed: true,
      },
    });

    if (!user) {
      throw new AuthenticationError('Confirmation code is not valid');
    }
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        confirmationCode: null,
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const changePassword = async (_parent, { password, confirmationCode }, context) => {
  const { prisma } = context;

  if (!validator.isLength(password, { min: 4 })) {
    throw new InvalidDataError('Password should be at least 4 characters');
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.update({
      where: {
        confirmationCode: +confirmationCode,
      },
      data: {
        password: hashedPassword,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const setPassword = async (_parent, { password }, context) => {
  const { user, prisma } = context;

  if (!validator.isLength(password, { min: 4 })) {
    throw new InvalidDataError('Password should be at least 4 characters');
  }

  if (user.password) return;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        password: hashedPassword,
        confirmed: true,
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};
