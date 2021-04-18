import { format } from 'date-fns';

export const getDateLabel = (date) => {
  if (!date) return null;

  return format(new Date(date), 'dd MMM, Y');
};

export default {
  getDateLabel,
};
