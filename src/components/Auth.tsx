import React, {useRef, useState} from 'react'
import { v4 as uuidv4 } from 'uuid'
import Ava from '@src/components/Ava'
import Dropdown from '@src/components/Dropdown/Dropdown'
import { useSelector } from 'react-redux'
import arrowDownIcon from '../../public/icons/arrow-down.svg'
import avaImg from '../../public/Layer691.png'
import useOutsideClick from "@src/hooks/useOutsideClick";

const options = [
  { id: uuidv4(), label: 'Profile', path: '/user-profile' },
  { id: uuidv4(), label: 'Terms & Conditions', path: '/terms' },
  { id: uuidv4(), label: 'About Us', path: '/about' },
  { id: uuidv4(), label: 'Privacy Policy', path: '/privacy' },
  { id: uuidv4(), label: 'Faq', path: '/faq' },
  { id: uuidv4(), label: 'Help Center', path: '/help' },
  { id: uuidv4(), label: 'News', path: '/news' },
  { id: uuidv4(), label: 'Log out', path: '/', actionClose: true },
]

const Auth = () => {
  const user = useSelector(({ auth: { user } }) => user)

    const [show, setShow] = useState(false)
    const dropdownMenuRef = useRef(null)

    useOutsideClick(show && dropdownMenuRef, () => setShow(false))

    const handelToggle = () => {
        setShow(!show)
    }

  return (
    <div className="auth" onClick={handelToggle}>
      <Ava
        online
        sm
        img={`${process.env.API_IMG_URL}${user?.profile?.avatar?.path}`}
        noImg={!user?.profile?.avatar}
        abbr={user?.profile?.name[0]}
      />
      <div className="auth__wrapper">
        <span className="auth__name">{user?.profile?.name}</span>
        {user?.profile?.rankTitle && (
          <span className="auth__status">
            Status: <span className="auth__status-marked">{user?.profile?.rankTitle}</span>
          </span>
        )}
      </div>

      <Dropdown options={options} icon={arrowDownIcon} handelToggle={handelToggle} dropdownMenuRef={dropdownMenuRef} show={show} />
    </div>
  )
}

export default Auth
