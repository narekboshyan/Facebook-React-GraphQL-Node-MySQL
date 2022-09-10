import { useCallback } from 'react';
import moment from 'moment-timezone';

export const useFormatDate = () => {
  const formatDate = useCallback(
    (date = new Date(), { format = 'MM/DD/YYYY', concatTimezone = false, timezone } = {}) => {
      const { zone = '', offset = '', standard = '' } = timezone || {};

      const newDate = moment.tz(date, zone).format(format);

      return concatTimezone && offset && standard ? `${newDate} ${standard}${offset}` : newDate;
    },
    []
  );

  return { formatDate };
};

export default { useFormatDate };
