import dayjs from 'dayjs';

const formatDate = (date: string) => {
  return dayjs(date).format('hh:mm DD.MM.YYYY');
};

export default formatDate;
