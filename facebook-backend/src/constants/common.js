export const documentStatus = {
  open: 'bost_Open',
  closed: 'bost_Close',
};

export const existingItemNo = 'pit_Resource';

export const ORDERS_COLUMN_SALES_ORDER = 'salesOrder';
export const ORDERS_COLUMN_CUSTOMER_PO = 'customerPo';
export const ORDERS_COLUMN_DOCUMENT_LINES = 'lines';

export const ORDER_COLUMNS = [
  { key: ORDERS_COLUMN_CUSTOMER_PO, title: 'Customer PO' },
  { key: ORDERS_COLUMN_SALES_ORDER, title: 'Sales Order' },
  { key: ORDERS_COLUMN_DOCUMENT_LINES, title: 'Lines' },
];

export const INVOICES_COLUMN_SALES_ORDER = 'salesOrder';
export const INVOICES_COLUMN_CUSTOMER_PO = 'customerPo';
export const INVOICES_COLUMN_DELIVERY_DATE = 'deliveryDate';
export const INVOICES_COLUMN_TRACKING_NUMBER = 'trackingNumber';

export const INVOICES_COLUMNS = [
  { key: INVOICES_COLUMN_CUSTOMER_PO, title: 'Customer PO' },
  { key: INVOICES_COLUMN_SALES_ORDER, title: 'Sales Order' },
  { key: INVOICES_COLUMN_DELIVERY_DATE, title: 'Delivery Date' },
  { key: INVOICES_COLUMN_TRACKING_NUMBER, title: 'Tracking number' },
];

export const QUOTES_COLUMN_QUOTE = 'quote';
export const QUOTES_COLUMN_QUOTES_TOTAL = 'quotesTotal';
export const QUOTES_COLUMN_LINES = 'lines';
export const QUOTES_COLUMN_SALES_ORDER = 'salesOrder';

export const QUOTES_COLUMNS = [
  { key: QUOTES_COLUMN_QUOTE, title: 'Quote' },
  { key: QUOTES_COLUMN_QUOTES_TOTAL, title: 'Quotes Total' },
  { key: QUOTES_COLUMN_LINES, title: 'Lines' },
  { key: QUOTES_COLUMN_SALES_ORDER, title: 'Sales Order' },
];

export const PO_ROUTE_STAGES_ITEM_TYPE = 'pit_Resource';
