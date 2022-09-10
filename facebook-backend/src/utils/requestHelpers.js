import moment from 'moment';
import { sapService } from '../services/ServiceLayer/index.js';

export const fetchGraphicData = async (args, reqUrl) => {
  try {
    const data = await sapService.get(reqUrl, args.maxPageSize);
    if (data.error) {
      throw new Error(data.statusText);
    }

    const startEndDates = [];

    for (
      let d = new Date(args.startDate);
      d <= new Date(args.endDate);
      d.setDate(d.getDate() + 1)
    ) {
      startEndDates.push(moment(d).format('YYYY-MM-DD').toString());
    }
    const dateCount = {};
    data.value.forEach((data) => (dateCount[data.CreationDate] = data.count));
    const graphicData = startEndDates.map((d) => ({
      date: d,
      count: dateCount[d] || 0,
    }));
    7;
    return graphicData;
  } catch (error) {
    console.log(error);
    return error;
  }
};
