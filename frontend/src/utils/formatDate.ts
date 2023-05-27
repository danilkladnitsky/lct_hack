import dayjs from 'dayjs';

const formatDate = (date: Date) => {
  return dayjs(date).format('hh:mm DD.MM.YYYY');
};

export default formatDate;
