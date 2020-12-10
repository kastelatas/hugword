import React from 'react'
import TabsItem from './TabsItem'
interface ITabsNavProps {
  options: any
  activeItem: any
  handleActiveTabItem: (e: any) => void
}

const TabsNav: React.FC<ITabsNavProps> = (props) => {
  const { options, handleActiveTabItem } = props

  return (
    <nav className="tabs-nav">
      <ul className="tabs-nav__container">
        {options.map((i) => (
          <TabsItem key={i.id} {...i} handleActiveTabItem={handleActiveTabItem} />
        ))}
      </ul>
    </nav>
  )
}

export default TabsNav

// Depricated component!!!! Dont use it!
