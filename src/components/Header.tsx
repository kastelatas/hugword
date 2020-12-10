import React, {useRef, useState} from 'react'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import SVG from 'react-inlinesvg'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@src/components/Button/Button'
import IconButton from '@src/components/Button/IconButton'
import Auth from '@src/components/Auth'
import Nav from '@src/components/Nav'
import { openModal } from '@src/redux/actions/modals'
import Dropdown from '@src/components/Dropdown/Dropdown'
import classNames from 'classnames'
import { convertFromTimeStampToDate } from '@src/utils/DateTimeHelper'
import bellIcon from '../../public/icons/bell.svg'
import burgerIcon from '../../public/icons/burger.svg'
import { ModalsType } from '../ts/enum/modal_enum'
import NotificationDropdown from "@src/components/Notification-Dropdown";
import useOutsideClick from "@src/hooks/useOutsideClick";
import DropdownMenu from "@src/components/Dropdown/DropdownMenu";

const options = [
  { id: uuidv4(), label: 'login/sign up', path: '/', actionModal: true },
  { id: uuidv4(), label: 'Terms & Conditions', path: '/terms' },
  { id: uuidv4(), label: 'About Us', path: '/about' },
  { id: uuidv4(), label: 'Privacy Policy', path: '/privacy' },
  { id: uuidv4(), label: 'Faq', path: '/faq' },
  { id: uuidv4(), label: 'Help Center', path: '/help' },
  { id: uuidv4(), label: 'News', path: '/news' },
]

const UnLogOptions = [
  { id: uuidv4(), label: 'login/signup', path: '/', actionModal: true },
  { id: uuidv4(), label: 'Help Center', path: '/help' },
  { id: uuidv4(), label: 'News', path: '/news' },
]

const Header = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(({ auth: { user } }) => user)
  const pushes = useSelector(({ notifications: { pushes } }) => pushes)

  const [isShown, setIsShown] = useState(false)

  const toggleFIeldset = () => setIsShown(!isShown)
  const navToggleFIeldset = () => {
    setIsShown(false)
    setShow(false)
  }


  const [show, setShow] = useState(false)
  const dropdownMenuRef = useRef(null)


  const handelToggle = () => {
    setShow(!show)
  }

  useOutsideClick(isShown && dropdownMenuRef, () => setIsShown(false))
  useOutsideClick(show && dropdownMenuRef, () => setShow(false))

  const notification = classNames('notification', {
    notification_active: Boolean(pushes?.length),
  })

  return (
    <header className="header">
      <Link href="/">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="logo">
          <SVG src="/icons/logo.svg" />
        </a>
      </Link>
      <Nav navToggleFIeldset={navToggleFIeldset} />
      <div className="header__item" onClick={handelToggle}>
        {isAuth && (
          <>
            <div className={notification}>
              <Button icon={bellIcon} onClick={toggleFIeldset} />
              {/* notification-dropdown  */}
              {isShown ? <NotificationDropdown notifications={pushes} dropdownMenuRef={dropdownMenuRef} /> : ''}
            </div>
          </>
        )}

        {
          isAuth ? <Auth /> : <Dropdown options={options} icon={burgerIcon} show={show} dropdownMenuRef={dropdownMenuRef}   handelToggle={handelToggle} />

          // <div className="burger-menu">
          //   <IconButton icon={burgerIcon} onClick={() => dispatch(openModal({modalType: ModalsType.AUTH})) } />
          // </div>
        }
      </div>
    </header>
  )
}

export default Header
