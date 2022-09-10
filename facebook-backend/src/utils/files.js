import excelJS from 'exceljs';

/**
 * @async
 * @function createExcelFile
 *
 * @param {{ rows: Array, columns: Array }} data columns and rows
 * @param {{
 *    workbookOptions: *,
 *    sheetOptions: *,
 *    headerStyles: *,
 *    forEachRow: void,
 *    forEachColumn: void,
 *  }} params
 *
 * @returns {Promise.<Buffer>} File
 */

export const createExcelFile = async (data = {}, params = {}) => {
  const { columns = [], rows = [] } = data;
  const {
    workbookOptions = {
      title: 'Orders',
      creator: 'Flash-Co',
      company: 'FlashCo',
      created: new Date(),
    },
    sheetOptions = {
      title: 'sheet',
    },
    headerStyles = {},
    forEachRow,
    forEachColumn,
  } = params;

  const workbook = new excelJS.Workbook();

  if (workbookOptions && typeof workbookOptions === 'object') {
    Object.entries(workbookOptions).forEach(([key, value]) => {
      workbook[key] = value;
    });
  }

  const worksheet = workbook.addWorksheet(sheetOptions?.title || 'sheet', {
    state: 'visible',
    ...(sheetOptions || {}),
  });

  worksheet.columns = columns;
  worksheet.addRows(rows);
  worksheet.properties.defaultRowHeight = 20;

  if (headerStyles && typeof headerStyles === 'object') {
    Object.entries(headerStyles).forEach(([key, value]) => {
      worksheet.getRow(1)[key] = value;
    });
  }

  if (forEachColumn && typeof forEachColumn === 'function') {
    worksheet.eachColumnKey((column) => {
      forEachColumn(column, worksheet.columnCount);
    });
  }

  if (forEachRow && typeof forEachRow === 'function') {
    worksheet.eachRow((row, rowNumber) => {
      forEachRow(row, rowNumber, worksheet.rowCount);
    });
  }

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};
