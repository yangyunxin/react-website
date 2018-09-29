import moment from 'moment';

export function formatDateMinute(date) {
  return moment(date).format('YYYY-MM-DD H:mm');
}
