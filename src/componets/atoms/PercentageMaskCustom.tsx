import * as React from 'react'
import { IMaskInput } from 'react-imask'

interface PercentageMaskCustomProps {
  onChange: (event: { target: { value: string } }) => void
}

const PercentageMaskCustom = React.forwardRef<HTMLElement, PercentageMaskCustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props
    return (
      <IMaskInput
        {...other}
        mask='00,00%'
        prepare={(str: string) => {
          if (!/[.0-9]/i.test(str)) {
            return ''
          }
          return str.toUpperCase()
        }}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { value } })}
        overwrite
      />
    )
  },
)

export default PercentageMaskCustom
