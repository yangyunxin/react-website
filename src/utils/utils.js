import moment from 'moment';

export function formatDate(date) {
  return moment(date).format('YYYY-MM-DD');
}

export function formatDateMinute(date) {
  return moment(date).format('YYYY-MM-DD HH:mm');
}

export function formatDateSecond(date) {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}
