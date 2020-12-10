import React from 'react'
import classnames from 'classnames'
import DropdownItem from './DropdownItem'
import {useSelector} from "react-redux";

const DropdownMenu = ({ options, dropdownMenuRef, handelToggle, show }) => {
  const currUser = useSelector(({ auth: { user } }) => user)
  const root = classnames('dropdown-menu', {
    'dropdown-menu_show': show,
  })



  return (
    <ul className={root} ref={dropdownMenuRef}>
      {options.map((i) => (
        <DropdownItem currUser={currUser} handelToggle={handelToggle} key={i.id} {...i} />
      ))}
    </ul>
  )
}

export default DropdownMenu
