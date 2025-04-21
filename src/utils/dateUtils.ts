
import { format, isValid, parseISO } from 'date-fns';

/**
 * Safely formats a date string to a display format
 * @param dateStr Date string to format
 * @param formatStr Format string to use (defaults to dd/MM/yyyy)
 * @returns Formatted date string or fallback text
 */
export const safeFormatDate = (dateStr: string | null | undefined, formatStr: string = 'dd/MM/yyyy'): string => {
  if (!dateStr) return 'N/A';
  try {
    const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
    if (!isValid(date)) return 'Data inválida';
    return format(date, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error, dateStr);
    return 'Data inválida';
  }
};
