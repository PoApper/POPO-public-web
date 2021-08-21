import moment from "moment";

export function convertDate(numberedDate) {
  const year = parseInt(numberedDate / 10000);
  const month = parseInt((numberedDate % 10000) / 100);
  const day = numberedDate % 100;
  const date = new Date().setFullYear(year, month - 1, day);
  return moment(date).format("YYYY.MM.DD")
}

export function convertTime(numberTime) {
  const hour = parseInt(numberTime / 100);
  const minute = numberTime % 100;
  const time = new Date().setHours(hour, minute)
  return moment(time).format('HH:mm');
}

export function convertStatus(status) {
  switch (status) {
    case '통과':
      return 'green'
    case '거절':
      return 'red'
    default:
      return 'black'
  }
}

export function convertDateTime(numberedDate, numberTime) {
  const year = parseInt(numberedDate / 10000);
  const month = parseInt((numberedDate % 10000) / 100);
  const day = numberedDate % 100;
  const date = new Date().setFullYear(year, month - 1, day);
  const hour = parseInt(numberTime / 100);
  const minute = numberTime % 100;
  return new Date(date).setHours(hour, minute);
}