/**
 * Shortens an Ethereum wallet address or any hex string by showing only the beginning and end parts
 * @param address - The wallet address or hex string to shorten (must start with '0x')
 * @param startLength - Number of characters to show from the start
 * @param endLength - Number of characters to show from the end
 * @returns Shortened address with ellipsis in the middle
 * @throws Error if address is invalid or lengths are negative
 */
export function shortWalletAddress(
  address: `0x${string}` | string,
  startLength: number = 6,
  endLength: number = 4
): string {
  // Input validation
  if (!address?.startsWith('0x')) {
    throw new Error('Invalid address format: must start with 0x')
  }

  if (startLength < 0 || endLength < 0) {
    throw new Error('Length parameters must be non-negative')
  }

  // If address is shorter than or equal to the combined length, return full address
  if (address.length <= startLength + endLength) {
    return address
  }

  const start = address.slice(0, startLength)
  const end = address.slice(-endLength)

  return `${start}...${end}`
}

/**
 * Shortens any text by showing only the beginning and optionally the end parts
 * @param text - The text to shorten
 * @param startLength - Number of characters to show from the start
 * @param endLength - Optional number of characters to show from the end
 * @returns Shortened text with ellipsis in the middle
 * @throws Error if text is empty or lengths are negative
 */
export function shortText(text: string, startLength: number, endLength?: number): string {
  // Input validation
  if (!text) {
    throw new Error('Text cannot be empty')
  }

  if (startLength < 0 || (endLength != null && endLength < 0)) {
    throw new Error('Length parameters must be non-negative')
  }

  // If text is shorter than or equal to startLength, return full text
  if (text.length <= startLength) {
    return text
  }

  const start = text.slice(0, startLength)

  // Handle case when endLength is not provided
  if (endLength == null) {
    return `${start}...`
  }

  // If text is shorter than combined length, return full text
  if (text.length <= startLength + endLength) {
    return text
  }

  const end = text.slice(-endLength)
  return `${start}...${end}`
}

/**
 *
 * @param str
 * @returns
 */
export function capitalizeFirstLetter(str: string): string {
  const specialCharsRegex = /[-`~!@#$%^&*_|=?;:'",<>]/gi

  return str
    .replace(specialCharsRegex, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 *
 * @param value
 * @returns
 */
export function getSplitName(value: string): { firstName: string; lastName: string } {
  const splitValue = value.trim().split(/\s+/)

  return {
    firstName: splitValue[0],
    lastName: splitValue.length > 1 ? splitValue.slice(1).join(' ') : '',
  }
}
