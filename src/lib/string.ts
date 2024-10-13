/**
 *
 * @param value
 * @returns
 */
export function getInitialName(value: string): string {
  const names = value.split(' ')

  const firstShortName = names[0].substring(0, 1).toUpperCase()
  const secondShortName = names[0].substring(1, 2).toUpperCase()

  let initials = `${firstShortName}`

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase()
  } else if (names.length <= 1) {
    initials = `${firstShortName}${secondShortName}`
  }

  return initials
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
