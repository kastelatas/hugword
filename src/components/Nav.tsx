import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'

const defaultLinks = [
  { id: uuidv4(), name: 'chat room', path: 'chat', isAuth: true },
  { id: uuidv4(), name: 'Help Center', path: 'help', isAuth: false },
]
const userlinks = [{ id: uuidv4(), name: 'Hug Search', path: '' }, ...defaultLinks]
const ambassadorlinks = [{ id: uuidv4(), name: 'Dashboard', path: '' }, ...defaultLinks]

const Nav = ({navToggleFIeldset}) => {
  const router = useRouter()
  const user = useSelector(({ auth: { user } }) => user)
  const [links, setLinks] = useState(userlinks)

  useEffect(() => {
    user?.type === 2 && setLinks(ambassadorlinks)
  }, [user])

  return (
    <nav className="nav" onClick={navToggleFIeldset}>
      <ul className="nav__container">
        {links.map((link) => {

          return (link.isAuth && user) || !link.isAuth ?  (
            <li
              key={link.id}
              className={classNames('nav__item', { nav__item_active: (router.pathname.split('/')[1] === link.path) ||
                  (router.pathname.split('/')[1] === 'dashboard' && !link?.path ) } ) }
            >
              <Link href={`/${link.path}`}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="nav__link">{link.name}</a>
              </Link>
            </li>
          ) : null
        })}
      </ul>
    </nav>
  )
}

export default Nav
