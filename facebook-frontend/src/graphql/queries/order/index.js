import { gql } from '@apollo/client';

export const GET_ORDERS_BY_DATE = gql`
  query getOrdersByDate(
    $startDate: String
    $endDate: String
    $maxPageSize: Int
    $selectedCompany: String
  ) {
    getOrdersByDate(
      startDate: $startDate
      endDate: $endDate
      maxPageSize: $maxPageSize
      selectedCompany: $selectedCompany
    ) {
      date
      count
      quantity
    }
  }
`;

export const GET_ALL_ORDERS = gql`
  query getOrders(
    $search: String
    $page: Int
    $sortBy: String
    $selectedCompany: String
    $count: Int
  ) {
    getOrders(
      search: $search
      page: $page
      sortBy: $sortBy
      selectedCompany: $selectedCompany
      count: $count
    )
  }
`;

export const GET_SINGLE_ORDER = gql`
  query getSingleOrder($id: Int, $selectedCompany: String) {
    getSingleOrder(id: $id, selectedCompany: $selectedCompany) {
      id
      salesOrder
      customerPo
      total
      shipDate
      POCount
    }
  }
`;

export const GET_ORDERS_TOTAL_PRICE = gql`
  query getOrdersPrice($selectedCompany: String) {
    getOrdersPrice(selectedCompany: $selectedCompany) {
      totalPrice
    }
  }
`;

export const GET_SINGLE_ORDER_TOTAL_PRICE = gql`
  query getSingleOrderTotalPrice($selectedCompany: String, $salesOrderId: String) {
    getSingleOrderTotalPrice(selectedCompany: $selectedCompany, salesOrderId: $salesOrderId) {
      totalPrice
    }
  }
`;

export const GET_PRODUCTION_ORDERS = gql`
  query getProductionOrders($id: Int) {
    getProductionOrders(id: $id) {
      name
      status
      startDate
      itemCode
      dueDate
      productionOrderId
      quantity
      issuedQty
      routeStagesQty
    }
  }
`;

export const GET_DOCUMENT_LINES_OF_ORDER = gql`
  query getDocumentLinesOfOrder($salesOrderId: String, $selectedCompany: String) {
    getDocumentLinesOfOrder(salesOrderId: $salesOrderId, selectedCompany: $selectedCompany) {
      itemCode
      description
      inventory
      availability
    }
  }
`;

export const GET_ROUTE_STAGES = gql`
  query getRouteStages($prodOrderId: String) {
    getRouteStages(prodOrderId: $prodOrderId)
  }
`;
