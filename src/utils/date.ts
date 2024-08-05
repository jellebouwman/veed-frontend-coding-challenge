import { format, sub } from 'date-fns';

export function getLastSevenDaysString() {
  return format(sub(new Date(), { days: 7 }), 'yyyy-MM-dd');
}