import React from 'react'
import InlineSVG from 'react-inlinesvg'
import classNames from 'classnames'
import achievIcon from '../../public/icons/star-achiev.svg'

const AchievIcon = ({gold, platinum, blue}) => {

  const root = classNames('achiev-icon', {
    'achiev-icon_gold': gold,
    'achiev-icon_platinum': platinum,
    'achiev-icon_blue': blue,
  })

  return (
    <div className={root}>
      <InlineSVG src={achievIcon} />
    </div>
  )
}

export default AchievIcon
