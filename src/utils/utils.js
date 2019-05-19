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

export function formatYuan(money = 0) {
  const yuan = (money / 100).toFixed(2);
  return yuan.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export function fixedNumber(num = 0) {
  return Number(num.toFixed(0));
}
