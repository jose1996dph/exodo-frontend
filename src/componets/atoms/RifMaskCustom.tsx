import * as React from 'react'
import { IMaskInput } from 'react-imask'

interface RifMaskCustomProps {
  onChange: (event: { target: { value: string } }) => void
}

const RifMaskCustom = React.forwardRef<HTMLElement, RifMaskCustomProps>(function TextMaskCustom(
  props,
  ref,
) {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      {...other}
      mask='a-00000000-0'
      prepare={(str: string) => {
        if (!/[VEJPG0-9]/i.test(str)) {
          return ''
        }
        return str.toUpperCase()
      }}
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { value } })}
      overwrite
    />
  )
})
/*

*/
export default RifMaskCustom
