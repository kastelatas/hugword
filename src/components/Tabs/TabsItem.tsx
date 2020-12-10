import React from 'react'
import classNames from 'classnames'

const TabsItem = (props: { label: any; isActive: any; handleActiveTabItem: any }) => {
  const { label, id, active, handleActiveTabItem } = props
  const root = classNames('tabs-nav__item', {
    'tabs-nav__item_active': active,
  })

  return (
    <li className={root} onClick={(e) => handleActiveTabItem(e, id)}>
      {label}
    </li>
  )
}
export default TabsItem

// Depricated component!!!! Dont use it!
