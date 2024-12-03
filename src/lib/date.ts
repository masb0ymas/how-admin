import { formatDate } from 'date-fns'
import { id } from 'date-fns/locale'

/**
 * Formats a date into a localized string representation
 * @param date - Date to format (string or Date object)
 * @param formatString - Optional custom format string (defaults to 'dd MMM yyyy HH:mm')
 * @param locale - Optional locale (defaults to Indonesian)
 * @returns Formatted date string
 * @throws Error if date is invalid
 */
export function formatLocalDate(
  date: string | Date | null | undefined,
  formatString: string = 'dd MMM yyyy HH:mm',
  locale = id
): string {
  try {
    // Handle null/undefined cases
    if (!date) {
      throw new Error('Date parameter is required')
    }

    // Convert string to Date object if necessary
    const dateObject = date instanceof Date ? date : new Date(date)

    // Check if date is valid
    if (isNaN(dateObject.getTime())) {
      throw new Error('Invalid date format')
    }

    return formatDate(dateObject, formatString, { locale })
  } catch (error) {
    // Handle specific error cases
    if (error instanceof Error) {
      throw new Error(`Date formatting error: ${error.message}`)
    }
    // Handle unknown errors
    throw new Error('An unexpected error occurred while formatting the date')
  }
}
