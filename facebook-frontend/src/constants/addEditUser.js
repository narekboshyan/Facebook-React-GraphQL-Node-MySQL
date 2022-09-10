import { v4 } from 'uuid';

export const TYPES = {
  afterEveryKeyStroke: 'afterEveryKeyStroke',
  selectCompany: 'selectCompany',
  input: 'InputChange',
  select: 'InputSelect',
  permissions: 'setPermissions',
  removeCompany: 'removeCompany',
  addCompanyId: 'addCompanyId',
  editUserCompanyValues: 'editUserCompanyValues',
  resetCompanyValues: 'resetCompanyValues'
};

export const userPermissions = {
  canReadOrders: false,
  canReadInvoices: false,
  canReadQuotes: true
};

export const initialState = {
  companyValues: [
    {
      id: v4(),
      permissions: userPermissions,
      value: '',
      companyName: '',
      companyId: ''
    }
  ]
};

export const companyReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.selectCompany:
      return {
        ...state,
        companyValues: state.companyValues.map(c => {
          const company = { ...c };
          if (c.id === payload.id) {
            company.companyName = payload.companyName.companyName;
            company.companyId = payload.companyName.companyId;
            company.value = payload.companyName.companyName;
          }
          return company;
        })
      };
    case TYPES.afterEveryKeyStroke:
      return {
        ...state,
        companyValues: state.companyValues.map(comp => {
          const company = { ...comp };
          if (comp.id === payload.id) {
            company.value = payload.value;
          }
          return company;
        })
      };
    case TYPES.permissions:
      delete payload.data.__typename;
      return {
        ...state,
        companyValues: state.companyValues.map(c => {
          const company = { ...c };
          if (c.id === payload.id) {
            company.permissions = payload.data;
          }
          return company;
        })
      };
    case TYPES.addCompany:
      if (state.companyValues) {
        return {
          ...state,
          companyValues: [
            ...state.companyValues,
            {
              id: v4(),
              permissions: userPermissions,
              value: '',
              companyName: '',
              companyId: ''
            }
          ]
        };
      }
      return {
        companyValues: [
          {
            id: v4(),
            permissions: userPermissions,
            value: '',
            companyName: '',
            companyId: ''
          }
        ]
      };
    case TYPES.removeCompany:
      return {
        ...state,
        companyValues: state.companyValues.filter(comp => comp.id !== payload)
      };
    case TYPES.resetCompanyValues:
      return {
        ...state,
        companyValues: []
      };
    case TYPES.editUserCompanyValues:
      return {
        ...state,
        companyValues: payload
      };
    default:
      return state;
  }
};
