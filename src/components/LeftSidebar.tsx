import React, { useEffect } from 'react'
import * as SideBar from '@src/components/layouts/SideBar'
import CategoryCardList from '@src/components/CategoryCardList'
import Sorting from '@src/components/Sorting'
import MiniCardCarousel from '@src/components/MiniCardCarousel'
import ContactsContainer from '@src/Containers/ContacsContainer'
import { getTopicsList } from '@src/redux/actions/user'

import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

const LeftSidebar = ({ children }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const currentUser = useSelector(({ ambassador: { ambassador } }) => ambassador)
  // const user = useSelector(({ auth: { user } }) => user)
  const similarUsers = useSelector(({ user: { similarUsers } }) => similarUsers)

  const handleSorting = (val) => {
    dispatch(getTopicsList(val))
  }

  return (
    <SideBar.LeftSidebar>
      {(router.pathname === '/' ||
        router.pathname === '/user-profile' ||
        router.pathname === '/dashboard' ||
        router.pathname === '/news' ||
        router.pathname === '/faq' ||
        router.pathname === '/news/[id]' ||
        router.pathname === '/about' ||
        router.pathname === '/terms' ||
        router.pathname === '/privacy' ||
        router.pathname === '/payment' ||
        router.pathname === '/reviews/[id]' ||
        router.pathname === '/profile/[userType]/[slug]' ||
        router.pathname === '/help') && (
        <SideBar.LeftSidebarHeader>
          <h3>Popular topics</h3>
          <Sorting type='relevance' handleSorting={handleSorting} />
        </SideBar.LeftSidebarHeader>
      )}
      <SideBar.LeftSidebarContent>
        {(router.pathname === '/' ||
          router.pathname === '/help' ||
          router.pathname === '/news' ||
          router.pathname === '/terms' ||
          router.pathname === '/privacy' ||
          router.pathname === '/dashboard' ||
          router.pathname === '/faq' ||
          router.pathname === '/news/[id]' ||
          router.pathname === '/about' ||
          router.pathname === '/profile/[slug]' ||
          router.pathname === '/reviews/[id]' ||
          router.pathname === '/payment' ||
          router.pathname === '/profile/[userType]/[slug]' ||
          router.pathname === '/user-profile') && <CategoryCardList />}
        {(router.pathname === '/chat' ||
          router.pathname === '/billing' ||
          router.pathname === '/shop' ||
          router.pathname === '/settings' ||
          router.pathname === '/statistics' ||
          router.pathname === '/chat/[userType]' ||
          router.pathname === '/chat/[userType]/[slug]') && (
          <>
            {Boolean(similarUsers.length) && (
              <div style={{ paddingLeft: 20 }}>
                <h2 className="sidebar-left__title">See more like {currentUser?.profile?.name}</h2>
                <div style={{ width: 346 }}>
                  <MiniCardCarousel numberOfCards={3} data={similarUsers} />
                </div>
              </div>
            )}
            <ContactsContainer />
          </>
        )}
      </SideBar.LeftSidebarContent>
    </SideBar.LeftSidebar>
  )
}

export default LeftSidebar
