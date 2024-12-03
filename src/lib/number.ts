import _ from 'lodash'

interface NumberFormatOptions extends Intl.NumberFormatOptions {
  locale: string
}

export interface CurrencyFormat {
  nominal: string | number
  options?: NumberFormatOptions
}

/**
 *
 * @param params
 * @returns
 */
function format(params: CurrencyFormat): string {
  if (typeof params.nominal !== 'string' && typeof params.nominal !== 'number') {
    throw new Error('Invalid nominal type')
  }

  if (params.options && typeof params.options !== 'object') {
    throw new Error('Invalid options type')
  }

  const { nominal, options } = params

  const defaultLocale = options?.locale ?? 'id-ID'
  const defaultCurrency = options?.currency ?? 'IDR'

  if (nominal || Number(nominal)) {
    const data = new Intl.NumberFormat(defaultLocale, {
      style: options?.currency ? 'currency' : undefined,
      currency: options?.currency ? defaultCurrency : undefined,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(Number(nominal))

    const result = data.replace(/\u00A0/, ' ')
    return result
  }

  return '-'
}

const locale_ID = 'id-ID'

/**
 *
 * @param value
 * @returns
 */
export function formatCurrencyIDR(value: string | number): string {
  const data = format({
    nominal: value,
    options: { locale: locale_ID, currency: 'IDR' },
  })

  return data
}

/**
 *
 * @param value
 * @returns
 */
export function formatCurrency(value: string | number): string {
  const data = format({ nominal: value })

  return data
}

/**
 *
 * @param value
 * @returns
 */
export function currencyParser(value: string | number | any): any {
  try {
    // for when the input gets clears
    if (typeof value === 'string' && !value.length) {
      value = '0.0'
    }

    // detecting and parsing between comma and dot
    const group = new Intl.NumberFormat(locale_ID).format(1111).replace(/1/g, '')
    const decimal = new Intl.NumberFormat(locale_ID).format(1.1).replace(/1/g, '')
    let reversedVal = value.replace(new RegExp(`\\${group}`, 'g'), '')
    reversedVal = reversedVal.replace(new RegExp(`\\${decimal}`, 'g'), '.')
    //  => 1232.21 €

    // removing everything except the digits and dot
    reversedVal = reversedVal.replace(/[^0-9.]/g, '')
    //  => 1232.21

    // appending digits properly
    const digitsAfterDecimalCount = (reversedVal.split('.')[1] || []).length
    const needsDigitsAppended = digitsAfterDecimalCount > 2

    if (needsDigitsAppended) {
      reversedVal *= 10 ** (digitsAfterDecimalCount - 2)
    }

    return Number.isNaN(reversedVal) ? 0 : reversedVal
  } catch (error) {
    console.error(error)
  }
}

/**
 *
 * @param value
 * @returns
 */
export function isNumeric(value: any): boolean {
  return !_.isNaN(parseFloat(value)) && _.isFinite(value)
}
