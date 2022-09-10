import fileDefault from 'assets/icons/file-blank-solid-240.png';
import fileCSS from 'assets/icons/file-css-solid-240.png';
import filePdf from 'assets/icons/file-pdf-solid-240.png';
import filePng from 'assets/icons/file-png-solid-240.png';

export const fixNumberCount = number => {
  if (!Number(number) && number !== 0) return number;

  return (+number).toFixed(2);
};

export const formatNumber = (
  number,
  {
    maximumFractionDigits,
    minimumFractionDigits,
    showCurrency = true,
    locale = 'en-US',
    currency = 'USD'
  } = {}
) => {
  const areMinAndMaxNotPassed =
    maximumFractionDigits === undefined && minimumFractionDigits === undefined;
  const min = areMinAndMaxNotPassed ? 2 : minimumFractionDigits;
  const max = areMinAndMaxNotPassed ? 2 : maximumFractionDigits;

  const formatConfig = {
    style: showCurrency ? 'currency' : 'decimal',
    ...(showCurrency ? { currency } : {}),
    ...(min ? { minimumFractionDigits: min } : {}),
    ...(max ? { maximumFractionDigits: max } : {})
  };

  return new Intl.NumberFormat(locale, formatConfig).format(+number || 0);
};

export const areSimilarArrays = (array1, array2) => {
  if (array1.length !== array2.length) return false;

  const sortedArray1 = array1.sort();
  const sortedArray2 = array2.sort();

  return sortedArray1.every((el, index) => el === sortedArray2[index]);
};

export const findByFieldName = (companyName, allData) =>
  allData.find(el => el.companyName === companyName) || {};

const displayTimeConvertor = (time, value, timeUnit) => {
  const partOfTime = time / value;
  return `${partOfTime} ${partOfTime > 1 ? `${timeUnit}s` : timeUnit}`;
};

export const convertMinutesToTimeString = minutes => {
  if (minutes === 0) return '0 minute';
  if (minutes % 525600 === 0) return displayTimeConvertor(minutes, 525600, 'year');
  if (minutes % 43200 === 0) return displayTimeConvertor(minutes, 43200, 'month');
  if (minutes % 10080 === 0) return displayTimeConvertor(minutes, 10080, 'week');
  if (minutes % 1440 === 0) return displayTimeConvertor(minutes, 1440, 'day');
  if (minutes % 60 === 0) return displayTimeConvertor(minutes, 60, 'hour');
  return displayTimeConvertor(minutes, 1, 'minute');
};

export const isJSON = json => {
  try {
    JSON.parse(json);
    return true;
  } catch (err) {
    return false;
  }
};

export const isRegexExpressionValid = (expression = '', flag = 'gi') => {
  try {
    RegExp(`(${expression})`, flag);
    return true;
  } catch (err) {
    return false;
  }
};

export const prepareViewFieldProps = (label, text) => ({ label, text });

export const getDaysInterval = (startDate, endDate) => {
  return Math.ceil(
    (new Date(startDate).getTime() - new Date(endDate).getTime()) / 1000 / 3600 / 24
  );
};

export const concatPriceAndUnit = ({ price, unit, seperator = '/' }) => {
  return `${price}${unit ? `${seperator}${unit}` : ''}`;
};

export const dateToMilliseconds = date => new Date(date).getTime();

export const setStartOfDay = date => {
  if (!Date.parse(date)) return null;
  return new Date(date.setHours(0, 0, 0, 0));
};

export const setEndOfDay = date => {
  if (!Date.parse(date)) return null;
  return new Date(date.setHours(23, 59, 59, 59));
};

export const isNumber = n => {
  if (typeof n === 'number') return n - n === 0;
  if (typeof n === 'string' && n.trim() !== '' && Number.isFinite) {
    return Number.isFinite(+n);
  }

  return false;
};

export const isEven = n => {
  if (!isNumber(n)) throw new TypeError('Expected number');

  return n % 2 === 0;
};

export const isOdd = n => !isEven(n);

export const showPriceOrDash = number => {
  if (!isNumber(number)) return '-';

  return formatNumber(number);
};

export const prepareCostCodeDisplayValue = (costCode, { showDashWhenEmpty = false } = {}) => {
  const emptyState = showDashWhenEmpty ? '-' : '';

  if (!costCode || typeof costCode !== 'object' || Array.isArray(costCode)) return emptyState;

  return `${costCode.code}-${costCode.title}`;
};

export const removeUnusedFieds = (obj, unusedFields = []) =>
  Object.keys(obj)
    .filter(key => !unusedFields.includes(key))
    .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});

export const isObject = o => !!o && typeof o === 'object' && !Array.isArray(o);

export const isObjectEmpty = o => {
  if (!isObject(o)) throw new TypeError('Expected object');
  return !Object.keys(o).length;
};

export const numberToTimeFormat = number => String(number).padStart(2, 0);

export const calculateTotalPriceByFieldName = (items, fieldName) => {
  if (!Array.isArray(items)) return 0;

  return items.reduce((sum, el) => sum + (Number(el[fieldName]) * Number(el.quantity) || 0), 0);
};

export const ImageConfig = {
  default: fileDefault,
  pdf: filePdf,
  png: filePng,
  css: fileCSS
};
