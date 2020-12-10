import React from 'react'
import * as Main from '@src/components/layouts/Main'
import Header from '@src/components/Header'
import Footer from '@src/components/Footer'
import Modal from "@src/components/modals/modal"
import LoadingModal from "@src/components/modals/LoadingModal"
import LeftSidebar from '@src/components/LeftSidebar'
import RightSidebar from '@src/components/RightSidebar'
import { useRouter } from 'next/router'

const MainLayout = ({ children }) => {
  const router = useRouter()

  return (
    <Main.MainBody>
      <LeftSidebar />
      <Main.MainSection>
        <Header />
        {children}
        {(router.pathname === '/' ||
          router.pathname === '/news' ||
          router.pathname === '/dashboard' ||
          router.pathname === '/help'
        ) && <Footer/>}
      </Main.MainSection>
      <RightSidebar/>
      <Modal />
      <LoadingModal />
    </Main.MainBody>
  )
}

export default MainLayout
