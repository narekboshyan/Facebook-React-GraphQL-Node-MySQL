const allOperationNames = [
  // Auth
  'signin',
  'getMe',
  'twoFactorAuthentication',
  'signup',
  'recoverPassword',
  'confirmCode',
  'changePassword',
  'emailConfirmation',
  'setPassword',

  // Orders
  'getOrders',
  'getProductionOrders',
  'getSingleOrder',
  'getOrdersByDate',
  'getOrdersPrice',
  'getSingleOrderTotalPrice',
  'getDocumentLinesOfOrder',
  'getRouteStages',

  // Invoices
  'getInvoices',
  'getInvoicesByDate',
  'getClosedInvoices',
  'getInvoiceDetails',
  'getInvoicesPrice',

  // users
  'addUser',
  'getAllUsers',
  'getUser',
  'updateUser',
  'deleteUser',

  // Company
  'getCompanies',

  // Quotes
  'getOpenQuotes',
  'getQuotesPrice',
  'getClosedQuotes',
  'getQuoteDetails',
  'getQuotesLines',

  // companies
  'switchCompanies',
  'searchInCompanies',

  'uploadFiles',
];

if (allOperationNames.length !== new Set(allOperationNames).size) {
  throw new Error('Operation names should be unique');
}

export const operationNamesToPermissions = {
  // unAuthenticated
  signin: { unAuthenticated: true },
  signup: { unAuthenticated: true },
  recoverPassword: { unAuthenticated: true },
  getMe: { unAuthenticated: true },
  changePassword: { unAuthenticated: true },
  emailConfirmation: { unAuthenticated: true },
  confirmCode: { unAuthenticated: true },
  twoFactorAuthentication: { unAuthenticated: true },

  // Orders
  getOrders: { permissions: ['canReadOrders'] },
  getSingleProductionOrder: { permissions: ['canReadOrders'] },
  getRouteStages: { permissions: ['canReadOrders'] },
  getSingleOrder: { permissions: ['canReadOrders'] },
  getOrdersByDate: { permissions: ['canReadOrders'] },
  // Invoices
  getInvoicesByDate: { permissions: ['canReadInvoices'] },
  getInvoices: { permissions: ['canReadInvoices'] },

  // users
  addUser: {
    permissions: ['canCreateUser'],
  },
  updateUser: {
    permissions: ['canUpdateUser'],
  },
  getAllUsers: {
    permissions: ['canReadUsers'],
  },
  getUser: {
    permissions: ['canReadUsers'],
  },
  deleteUser: {
    permissions: ['canDeleteUser'],
  },
  // company
  getCompanies: {
    permissions: ['canReadCompanies'],
  },
  getAllQuotes: {
    permissions: ['canReadQuotes'],
  },
  switchCompanies: {
    permissions: ['canReadQuotes'],
  },
  searchInCompanies: {
    permissions: ['canReadQuotes'],
  },
  getOpenQuotes: {
    permissions: ['canReadQuotes'],
  },
  getClosedQuotes: {
    permissions: ['canReadQuotes'],
  },
  getQuoteDetails: {
    permissions: ['canReadQuotes'],
  },
  getQuotesLines: {
    permissions: ['canReadQuotes'],
  },
  uploadFiles: {
    permissions: ['canReadQuotes'],
  },
};

if (allOperationNames.length !== new Set(allOperationNames).size) {
  throw new Error('Operation names should be unique');
}

export const GENERAL_ADMIN_ROLE = {
  name: 'Admin',
  title: 'General admin',
  id: 1,
};
export const DISTRIBUTOR_ROLE = {
  name: 'User',
  title: 'User',
  id: 2,
};

export const defaultRoles = [
  {
    id: 1,
    name: GENERAL_ADMIN_ROLE.name,
    title: GENERAL_ADMIN_ROLE.title,
    permissions: {
      canReadUsers: true,
      canUpdateUser: true,
      canDeleteUser: true,
      canCreateUser: true,
    },
  },
  {
    id: 2,
    name: DISTRIBUTOR_ROLE.name,
    title: DISTRIBUTOR_ROLE.title,
    permissions: {
      canReadQuotes: true,
    },
  },
];
