export function formatUrlText(value: string) {
  return value.replace('#', '%23').replace('&', '%26')
}

export function formatDate(value: Date | string) {
  const _value = typeof value === 'string' ? new Date(value) : value

  return _value.toLocaleDateString()
}

export function formatFloat(value: number) {
  return value.toLocaleString('es-VE', { minimumFractionDigits: 2 })
}

export function formatInteger(value: number) {
  return value.toLocaleString('es-VE', { minimumFractionDigits: 0 })
}
