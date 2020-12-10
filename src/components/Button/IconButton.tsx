import React from 'react'
import classNames from 'classnames'
import SVG from 'react-inlinesvg'
import Link from 'next/link'

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: any
  gift?: boolean
  sun?: boolean
  add?: boolean
  closePhoto?: boolean
  closeRing?: boolean
  shop?: boolean
  edit?: boolean
  as?: any
  to?: any
  message?: boolean
  play?: boolean
  close?: boolean
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  send?: boolean
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  const {
    icon,
    shop,
    gift,
    closePhoto,
    as,
    to,
    edit,
    sun,
    addRing,
    message,
    add,
    onClick,
    play,
    className,
    close,
    send,
  } = props

  const root = classNames('btn-icon', {
    'btn-icon_type_sun': sun,
    'btn-icon_type_add': add,
    'btn-icon_type_add-ring': addRing,
    'btn-icon_type_close-photo': closePhoto,
    'btn-icon_type_gift': gift,
    'btn-icon_type_shop': shop,
    'btn-icon_type_edit': edit,
    'btn-icon_type_send': send,
    'btn-icon_type_close': close,
    'btn-icon_type_play': play,
    'btn-icon_type_message': message,
    [`${className}`]: className,
  })

  if (to) {
    return (
      <Link href={to} as={as}>
        <button type="button" className={root} onClick={onClick}>
          <span className="btn-icon__content">
            <SVG src={icon} />
          </span>
        </button>
      </Link>
    )
  }
  return (
    <button type="button" className={root} onClick={onClick}>
      <span className="btn-icon__content">
        <SVG src={icon} />
      </span>
    </button>
  )
}

export default IconButton
