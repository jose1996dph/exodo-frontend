const CURRENCY = 'currency'
const DOLLAR_PRICE = 'dollarPrice'

export enum Currencies {
  BOLIVAR = 'bolivar',
  DOLLAR = 'dollar',
}

export function setCurrency(value: Currencies): void {
  return localStorage.setItem(CURRENCY, value)
}

export function getCurrency(): Currencies {
  const _currency = localStorage.getItem(CURRENCY) as Currencies
  return !_currency ? Currencies.BOLIVAR : _currency
}

export function setDollarPrice(value: number): void {
  return localStorage.setItem(DOLLAR_PRICE, value.toString())
}

export function getDollarPrice(): number {
  const _value = localStorage.getItem(DOLLAR_PRICE) || '0'
  const _price = parseFloat(_value)
  return _price
}
