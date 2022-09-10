import { numberToTimeFormat } from 'helpers/common';

export const SELECT_OPTIONS = [null];
export const MAX_HOUR_VALUE = 23;
export const HOURS_INTERVAL = 1;
export const MAX_MINUTE_VALUE = 59;
export const MINUTES_INTERVAL = 5;

export const MENU_DEFAULT_PROPS = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left'
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  getContentAnchorEl: null
};

export const HOURS = Array.from({ length: 24 / HOURS_INTERVAL })
  .fill(null)
  .map((_, i) => numberToTimeFormat(i * HOURS_INTERVAL));

export const MINUTES = Array.from({ length: 60 / MINUTES_INTERVAL })
  .fill(null)
  .map((_, i) => numberToTimeFormat(i * MINUTES_INTERVAL));
