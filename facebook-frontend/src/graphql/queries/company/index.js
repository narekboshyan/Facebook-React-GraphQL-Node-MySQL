import { gql } from '@apollo/client';

export const GET_COMPANY_NAMES = gql`
  query getCompanies($search: String) {
    getCompanies(search: $search) {
      companyName
      companyId
    }
  }
`;

export const SWITCH_COMPANY = gql`
  query switchCompanies($companyName: String) {
    switchCompanies(companyName: $companyName) {
      companyId
      id
      companyName
      permissions {
        canReadOrders
        canReadQuotes
        canReadInvoices
      }
      value
    }
  }
`;

export const SEARCH_COMPANY = gql`
  query searchInCompanies($searchInCompanies: String) {
    searchInCompanies(searchInCompanies: $searchInCompanies) {
      companyId
      id
      companyName
      permissions {
        canReadOrders
        canReadQuotes
        canReadInvoices
      }
      value
    }
  }
`;
