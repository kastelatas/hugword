import React from 'react'
import classNames from 'classnames'
import SVG from 'react-inlinesvg'
import Link from 'next/link'

const Button = (props: { icon?: any; success?: boolean; children: any; as?: any; block?: boolean; to?: any; onClick?: any; disabled?: boolean }) => {
  const { icon, children, success, disabled, as, block, to, onClick } = props

  const btnClass = classNames('btn', {
    btn_icon: icon,
    btn_block: block,
    btn_success: success,
  })

  const btnIconClass = classNames('btn-icon', {})



  if (icon && !to) {
    return (
      <button type="button" className={btnIconClass} onClick={onClick}>
        <SVG src={icon} />
        <span>{children}</span>
      </button>
    )
  }

  if (to && icon) {
    return (
      <Link href={to} as={as}>
        <a className={btnClass} onClick={onClick}>
          <SVG src={icon} />
          <span>{children}</span>
        </a>
      </Link>
    )
  }

  if (to && !icon) {
    return (
      <Link href={to} as={as}>
        <a className={btnClass} onClick={onClick}>
          <span>{children}</span>
        </a>
      </Link>
    )
  }

  return (
    <button type="button" disabled={disabled} className={btnClass} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
