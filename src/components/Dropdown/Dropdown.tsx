import React, { useState, useRef } from 'react'
import Button from '@src/components/Button/Button'
import DropdownMenu from './DropdownMenu'
import useOutsideClick from '../../hooks/useOutsideClick'

const Dropdown = ({ options, icon, handelToggle, dropdownMenuRef, show }) => {
  return (
    <div style={{ position: 'relative' }}>
      <div className="auth__icon">
        <Button icon={icon} onClick={handelToggle} />
      </div>

      <DropdownMenu show={show} options={options} dropdownMenuRef={dropdownMenuRef} handelToggle={handelToggle} />
    </div>
  )
}

export default Dropdown
