import React from 'react'
import SVG from 'react-inlinesvg'
import classNames from 'classnames'

export const Input = ({ placeholder, value, type, name, handleChange }) => {
  return <input value={value} name={name} type={type} placeholder={placeholder} onChange={handleChange} />
}

export const InputAppend = ({ children }) => {
  return <span className="input-group__append">{children}</span>
}

export const InputPrefix = ({ icon }) => {
  return (
    <span className="input-group__prefix">
      <SVG src={icon} />
    </span>
  )
}

export const FormControl = ({ children, block, prefixIcon, accent }) => {
  const root = classNames('input-group', {
    'input-group_icon_left': prefixIcon,
    'input-group_accent': accent,
    'input-group_block': block,
  })

  return <div className={root}>{children}</div>
}
