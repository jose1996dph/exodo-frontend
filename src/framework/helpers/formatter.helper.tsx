export function formatUrlText(value: string) {
  return value.replace('#', '%23').replace('&', '%26')
}

export function formatDate(value: Date | string) {
  const _value = typeof value === 'string' ? new Date(value) : value

  return _value.toLocaleDateString()
}
