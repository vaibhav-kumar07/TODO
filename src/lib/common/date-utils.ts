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

export function formatRelativeOrDate(
  date: string | Date | moment.Moment | null | undefined,
  dateFormat: string = 'DD-MM-YYYY',
  fallback: string = 'Invalid date'
): string {
  if (!date) {
    return fallback;
  }

  const parsed = moment(date);
  if (!parsed.isValid()) {
    return fallback;
  }

  const now = moment();

  if (parsed.isSame(now, 'day')) {
    const diffMinutes = now.diff(parsed, 'minutes');
    if (diffMinutes < 1) {
      return 'Just now';
    }
    if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
    }
    const diffHours = now.diff(parsed, 'hours');
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  }

  if (parsed.isSame(now.clone().subtract(1, 'day'), 'day')) {
    return 'Yesterday';
  }

  return parsed.format(dateFormat);
}

