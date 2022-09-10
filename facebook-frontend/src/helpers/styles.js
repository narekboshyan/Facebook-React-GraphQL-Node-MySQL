import {
  DARK_BLUE_COLOR,
  LIGHT_BLUE_COLOR,
  WHITE_COLOR,
  DARK_RED_COLOR,
  LIGHT_BLUE_DISABLED_COLOR,
  DARK_RED_DISABLED_COLOR,
  DARK_GREEN_COLOR,
  DARK_GREEN_DISABLED_COLOR
} from 'constants/index';

export const getDisabledButtonBgColor = bgColor => {
  switch (bgColor) {
    case LIGHT_BLUE_COLOR:
      return LIGHT_BLUE_DISABLED_COLOR;
    case DARK_RED_COLOR:
      return DARK_RED_DISABLED_COLOR;
    case DARK_GREEN_COLOR:
      return DARK_GREEN_DISABLED_COLOR;
    default:
      return bgColor;
  }
};

export const getDisabledButtonBorderColor = borderColor => {
  switch (borderColor) {
    case LIGHT_BLUE_COLOR:
      return LIGHT_BLUE_DISABLED_COLOR;
    case WHITE_COLOR:
      return WHITE_COLOR;
    case DARK_RED_COLOR:
      return DARK_RED_DISABLED_COLOR;
    case DARK_GREEN_COLOR:
      return DARK_GREEN_DISABLED_COLOR;
    default:
      return borderColor;
  }
};

export const getDisabledButtonTextColor = (textColor, bgColor) => {
  if ((bgColor === DARK_RED_COLOR && textColor === WHITE_COLOR) || bgColor === DARK_GREEN_COLOR) {
    return WHITE_COLOR;
  }

  return `${DARK_BLUE_COLOR}4d`;
};
