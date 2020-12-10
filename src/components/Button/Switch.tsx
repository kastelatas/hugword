import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

const Switch = ({ label, value, name, handleSwitchChange }) => {
  const [inputValue, setInputValue] = useState(value)
    // console.log("---------------value-----------------", value );
    // console.log("---------------name-----------------", name );
  const root = classNames('switch__text', {
    switch__text_right: inputValue,
  })

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleChange = (e) => {
    setInputValue(e.target.checked)
    handleSwitchChange && handleSwitchChange(e, name)
  }

  return (
    <label className="switch">
      <input type="checkbox" checked={!value} onChange={(e) => handleChange(e)} />
      <span className="switch-slider round" />
      <span className={root}>{inputValue ? 'Off' : 'On'} </span>
    </label>
  )
}

export default Switch
