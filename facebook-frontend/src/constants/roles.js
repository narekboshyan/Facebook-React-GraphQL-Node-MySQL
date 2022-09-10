import {
  DASHBOARD_ROUTE,
  INVOICES_ROUTE,
  ORDERS_ROUTE,
  QUOTES_ROUTE,
  USERS_ROUTE,
  ACCOUNT_SETTINGS_ROUTE
} from './routes';

export const allRolePermissions = {
  // Create
  addUser: 'canCreateUser',

  // Read
  getOrders: 'canReadOrders',
  getSingleProductionOrder: 'canReadOrders',
  getSingleOrder: 'canReadOrders',
  getOrdersByDate: 'canReadOrders',
  getInvoicesByDate: 'canReadInvoices',
  getInvoices: 'canReadInvoices',
  getAllUsers: 'canReadUsers',
  getUser: 'canReadUsers',
  getCompanies: 'canReadCompanies',
  getAllQuotes: 'canReadQuotes',
  forAllUsers: 'canReadAccount',

  // Update
  updateUser: 'canUpdateUser',

  // Delete
  deleteUser: 'canDeleteUser'
};

const dashboardPermissions = [
  'canReadQuotes',
  'canReadDashboard',
  'canReadOrders',
  'canReadInvoices'
];
const quotesPermissions = ['canReadQuotes'];
const ordersPermissions = ['canReadOrders'];
const usersPermissions = ['canReadUsers'];
const invoicesPermissions = ['canReadInvoices'];
const allUserPermissions = ['canReadAccount'];

export const allowedViews = [
  {
    route: DASHBOARD_ROUTE,
    actions: dashboardPermissions
  },
  {
    route: USERS_ROUTE,
    actions: usersPermissions
  },
  {
    route: INVOICES_ROUTE,
    actions: invoicesPermissions
  },
  {
    route: QUOTES_ROUTE,
    actions: quotesPermissions
  },
  {
    route: ORDERS_ROUTE,
    actions: ordersPermissions
  },
  {
    route: ACCOUNT_SETTINGS_ROUTE,
    actions: allUserPermissions
  }
];
