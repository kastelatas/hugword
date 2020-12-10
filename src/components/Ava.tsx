import React from 'react'
import classNames from 'classnames'

interface AvaProps {
  online?: boolean
  xs?: boolean
  sm?: boolean
  rec?: boolean
  lg?: boolean
  border?: boolean
  children?: any
  img: string
  abbr?: any
  noImg?: any
}

const Ava: React.FC<AvaProps> = (props) => {
  const { online, sm, xs, abbr, noImg, children, rec, lg, border, img } = props
  const root = classNames('ava', {
    'ava_online': online,
    'ava_sm': sm,
    'ava_xs': xs,
    'ava_rectangle': rec,
    'ava_lg': lg,
    'ava_no-img': noImg,
    'ava_border': border
  })

  return (
    <div className={root}>
      {!noImg && <img className="ava__img" src={img} alt="img"/>}
      {noImg && <span>{abbr}</span>}
      {children}
    </div>
  )
}

export default Ava
