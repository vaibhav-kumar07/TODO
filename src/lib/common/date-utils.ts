import moment from 'moment';
export function formatDate(
  date: string | Date | moment.Moment | null | undefined,
  format: string,
  fallback: string = 'Invalid date'
): string {
  if (!date) {
    return fallback;
  }


return moment(date).format(format);
}

