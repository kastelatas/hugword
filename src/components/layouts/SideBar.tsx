import React from 'react'
import { useRouter } from 'next/router'
import classnames from 'classnames'

export const LeftSidebar = ({ children }) => {
  const router = useRouter()
  const root = classnames('sidebar-left', {
    'sidebar-left_colored': router.pathname === '/chat'
  })
  return <div>
    <aside className={root}>{children}</aside>
  </div>
}

export const RightSidebar = ({ children }) => {
  return <aside className="sidebar-right">{children}</aside>
}

export const LeftSidebarHeader = ({ children }) => {
  return <aside className="sidebar-left__header">{children}</aside>
}

export const LeftSidebarContent = ({ children }) => {
  return (
    <aside className="sidebar-left__content">
      <div className="sidebar-left__ltr">{children}</div>
    </aside>
  )
}

export const RightSidebarHeader = ({ children }) => {
  return <aside className="sidebar-right__header">{children}</aside>
}

export const RightSidebarContent = ({ children }) => {
  return <aside className="sidebar-right__content">{children}</aside>
}
