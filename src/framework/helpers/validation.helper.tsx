export const isEmail = (value: string): boolean => {
  const expresiton = '^[\\w-\\.]+[\\w-+\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'
  return value.match(expresiton) !== null
}

export const isRif = (value: string): boolean => {
  const expresiton = '^([VEJPG]{1})-([0-9]{8})-([0-9]{1}$)'
  return value.match(expresiton) !== null
}
