import { gql } from '@apollo/client';

export const GET_INVOICES_BY_DATE = gql`
  query getInvoicesByDate(
    $startDate: String
    $endDate: String
    $maxPageSize: Int
    $selectedCompany: String
  ) {
    getInvoicesByDate(
      startDate: $startDate
      endDate: $endDate
      maxPageSize: $maxPageSize
      selectedCompany: $selectedCompany
    ) {
      date
      count
    }
  }
`;

export const GET_ALL_INVOICES = gql`
  query getInvoices($search: String, $page: Int, $selectedCompany: String, $sortBy: String) {
    getInvoices(search: $search, page: $page, selectedCompany: $selectedCompany, sortBy: $sortBy)
  }
`;

export const GET_INVOICE_DETAILS = gql`
  query getInvoiceDetails($id: Int) {
    getInvoiceDetails(id: $id)
  }
`;

export const GET_ALL_CLOSED_INVOICES = gql`
  query getClosedInvoices($search: String, $page: Int, $selectedCompany: String, $sortBy: String) {
    getClosedInvoices(
      search: $search
      page: $page
      selectedCompany: $selectedCompany
      sortBy: $sortBy
    )
  }
`;

export const GET_INVOICES_TOTAL_PRICE = gql`
  query getInvoicesPrice($selectedCompany: String) {
    getInvoicesPrice(selectedCompany: $selectedCompany) {
      totalPrice
    }
  }
`;
