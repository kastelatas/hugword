import React from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { logout } from '@src/redux/actions/auth'
import { openModal } from '@src/redux/actions/modals'
import { ModalsType } from '../../ts/enum/modal_enum'

const DropdownItem = ({ label, path, handelToggle, actionClose, actionModal }) => {
  const dispatch = useDispatch()

  const renderrItem = () => {
    if (actionClose) {
      return (
        <li
          className="dropdown-menu__item"
          onClick={() => {
            dispatch(logout())
            handelToggle()
          }}
        >
          <a className="dropdown-menu__link">{label}</a>
        </li>
      )
    }

    if (actionModal) {
      return (
        <li
          className="dropdown-menu__item"
          onClick={() => {
            dispatch(openModal({ modalType: ModalsType.AUTH }))
            handelToggle()
          }}
        >
          <a className="dropdown-menu__link">{label}</a>
        </li>
      )
    }

    return (
      <li className="dropdown-menu__item">
        <Link href={`${path}`} passHref>
          <a onClick={() => handelToggle()} className="dropdown-menu__link">
            {label}
          </a>
        </Link>
      </li>
    )
  }
  return <>{renderrItem()}</>
}

export default DropdownItem
