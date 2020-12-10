import React from 'react'

const Radio = (props: {
  label: string
  name?: string
  value?: any
  isChecked?: boolean
  handleGenderValueChange?: any
}) => {
  const { label, name, handleGenderValueChange, value, defaultCheck, isChecked } = props
  return (
    <label className="radio">
      <input type="radio" name="radio" value={value} defaultChecked={defaultCheck && (defaultCheck === value)} checked={isChecked} onChange={(event) => handleGenderValueChange(event)} />
      <span>{label}</span>
    </label>
  )
}

export default Radio
