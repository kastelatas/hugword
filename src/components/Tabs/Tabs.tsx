import React, { useState } from 'react'
import classNames from 'classnames'

const Tabs = ({ children, bottomPanel = false }) => {
  const [val, setValue] = useState(0)

  const tabHeader = () => {
    return children.map((i, idx) => {
      return (
        <li
          className={classNames('tabs-nav__item', { 'tabs-nav__item_active': idx === val })}
          key={idx}
          onClick={() => setValue(idx)}
        >
          {i.props.title}
        </li>
      )
    })
  }

  return (
    <div className="tabs-row">
      <ul className="tabs">{tabHeader()}</ul>
      <div className="tabs__pannel">{children[val]}</div>
      {bottomPanel && <ul className="tabs tabs_bottom">{tabHeader()}</ul>}
    </div>
  )
}
export default Tabs
