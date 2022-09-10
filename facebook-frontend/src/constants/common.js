export const FIELD_TYPE = {
  text: 'text',
  search: 'search',
  select: 'select'
};

export const FIELD_SIZE = {
  xs: 'xs',
  sm: 'sm',
  md: 'md'
};

export const PICKER_TYPE = {
  dateRange: 'date-range',
  select: 'select'
};

export const FILE_FOLDER_TYPE = {
  folder: 'folder'
};

export const FILE_ROOT_TABLES = {
  file: 'file',
  commonFile: 'commonFile'
};

export const GRID_SIZE = {
  small: 'small',
  large: 'large'
};

export const Z_INDEX_INCREASED_FOR_LOADER = 120;
export const DELETE_LOADING_TEXT = 'Deleting...';
export const SAVE_LOADING_TEXT = 'Saving...';
export const FETCH_LOADING_TEXT = 'Loading...';
export const UPDATE_LOADING_TEXT = 'Updating...';
export const UPLOAD_LOADING_TEXT = 'Uploading...';
export const IMPORT_LOADING_TEXT = 'Importing...';
export const SIGNING_UP_LOADING_TEXT = 'Signing up...';
export const RESTORE_LOADING_TEXT = 'Restoring...';
export const RESTORE_IMPORTING_TEXT = 'Importing...';
export const SENDING_CONTACT_INFO_TEXT = 'Sending contact info...';

// Quantity default
export const QUANTITY_DEFAULT_VALUE = '1';

export const SNACKBAR_TYPE = {
  success: 'success',
  error: 'error'
};

export const SNACKBAR_MESSAGES = {
  filesSuccessfullyUploaded: 'Files are successfully send',
  successfullySendMessage: 'Your message is sent successfully'
};

export const DATE_FORMAT = 'MM/DD/YYYY';
export const DATE_TIME_FORMAT = 'MM/DD/YYYY HH:mm';

export const SELECTED_COMPANY = 'selectedCompany';

export const uniqueNumberGenerator = () => Date.now() + Math.random();

export const invoiceRowDataNames = [
  'U_SO',
  'NumAtCard',
  'DocDueDate',
  'DocTotal',
  'TrackingNumber'
];
export const openInvoiceRowDataNames = [
  'U_SO',
  'NumAtCard',
  'DocDueDate',
  'PaidToDate',
  'TrackingNumber'
];
export const invoiceHeadCells = [
  {
    id: 'U_SO',
    label: 'Sales Order'
  },
  {
    id: 'NumAtCard',
    label: 'Customer PO'
  },
  {
    id: 'DocDueDate',
    label: 'Delivery Date'
  },
  {
    id: 'DocTotal',
    label: 'Order Total'
  },
  {
    id: 'TrackingNumber',
    label: 'TrackingNumber'
  }
];

export const openInvoiceHeadCells = [
  {
    id: 'U_SO',
    label: 'Sales Order'
  },
  {
    id: 'NumAtCard',
    label: 'Customer PO'
  },
  {
    id: 'DocDueDate',
    label: 'Delivery Date'
  },
  {
    id: 'PaidToDate',
    label: 'Balance Due'
  },
  {
    id: 'TrackingNumber',
    label: 'TrackingNumber'
  }
];

export const invoiceSeriesHelper = data => {
  return [
    {
      name: 'Total Amount $',
      type: 'column',
      data: data.map(({ count }) => count)
    }
  ];
};

export const invoiceOptionsHelper = data => {
  return {
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        tools: {
          download: true,
          selection: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          reset: false,
          pan: false
        },
        autoSelected: 'zoom'
      }
    },
    stroke: {
      width: [0, 4]
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1]
    },
    labels: data.map(({ date }) => date),
    xaxis: {
      type: 'datetime'
    },
    yaxis: [
      {
        tickAmount: 4,
        seriesName: 'Linear'
      }
    ]
  };
};

export const ERROR_TYPES = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  password: 'password',
  userType: 'userType'
};
