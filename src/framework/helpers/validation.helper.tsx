export const isEmail = (value: string): boolean => {
  const expresiton = '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'
  return value.match(expresiton) !== null
}
