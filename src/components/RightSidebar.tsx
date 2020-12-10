import React from 'react'
import * as SideBar from '@src/components/layouts/SideBar'
import PushCardList from '@src/components/PushCardList'
import IconButton from '@src/components/Button/IconButton'
import { useRouter } from 'next/router'
import sunIcon from '../../public/icons/sun.svg'

const RightSidebar = () => {
  const router = useRouter()
  return (
    <SideBar.RightSidebar>
      { router.pathname !== '/404' &&
        <>
          <SideBar.RightSidebarHeader>
            {/*<div className="switcher">*/}
            {/*  <span className="sidebar-right__header-text">Day</span>*/}
            {/*  <IconButton sun icon={sunIcon} />*/}
            {/*</div>*/}
          </SideBar.RightSidebarHeader>
          <SideBar.RightSidebarContent>
            <PushCardList />
          </SideBar.RightSidebarContent>
        </>
      }

    </SideBar.RightSidebar>
  )
}

export default RightSidebar
