import { gql } from '@apollo/client';

export const GET_QUOTES_TOTAL_PRICE = gql`
  query getQuotesPrice($selectedCompany: String) {
    getQuotesPrice(selectedCompany: $selectedCompany) {
      totalPrice
    }
  }
`;

export const GET_OPEN_QUOTES = gql`
  query getOpenQuotes($selectedCompany: String, $search: String, $sortBy: String, $page: Int) {
    getOpenQuotes(selectedCompany: $selectedCompany, search: $search, sortBy: $sortBy, page: $page)
  }
`;

export const GET_CLOSED_QUOTES = gql`
  query getClosedQuotes($selectedCompany: String, $search: String, $sortBy: String, $page: Int) {
    getClosedQuotes(
      selectedCompany: $selectedCompany
      search: $search
      sortBy: $sortBy
      page: $page
    )
  }
`;

export const GET_QUOTE_DETAILS = gql`
  query getQuoteDetails($id: Int, $selectedCompany: String) {
    getQuoteDetails(id: $id, selectedCompany: $selectedCompany)
  }
`;

export const GET_DOCUMENT_LINES_OF_QUOTES = gql`
  query getQuotesLines($quotationId: String, $selectedCompany: String) {
    getQuotesLines(quotationId: $quotationId, selectedCompany: $selectedCompany)
  }
`;
