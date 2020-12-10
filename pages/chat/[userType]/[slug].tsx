import React, { useEffect, useState, useRef, useCallback } from 'react'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import * as Chat from '@src/components/Chat'
import Profile from '@src/components/Profile'
import { wrapper } from '@src/redux/store'
import { getAmbassadorById, getAmbassadoresList } from '@src/redux/actions/ambassador'
import { addToContactList } from '@src/redux/actions/chat'
import { UserTypeToString, UserTypeName } from '@src/ts/enum/user_enum'
import UserProfile from '@src/components/UserProfile'
import { useDispatch, useSelector } from 'react-redux'
import { getSimilarUsers } from '@src/redux/actions/user'

const IndexPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isHide, setIsHide] = useState(false)
  const [isLeft, setIsLeft] = useState(false)
  const currUser = useSelector(({ auth: { user } }) => user)
  const contacts = useSelector(({ chat: { contacts } }) => contacts)
  const ambassador = useSelector(({ ambassador: { ambassador } }) => ambassador)
  const ambassadorLoading = useSelector(({ ambassador }) => ambassador)
  const ambassadorList = useSelector(({ ambassador: { list } }) => list)
  const currUserId = router.query?.slug
  const currUserType = router.query?.userType

  const root = classnames('chat', {
    chat_profile_hide: isHide,
  })

  useEffect(() => {
//   dispatch(getAmbassadorById(currUserId, currUserType))
//     const isUserinContacts = Boolean(contacts) && contacts.some((i) => i?.user?.id === parseInt(currUserId))
//     const getCurrUser = ambassadorList.find((i) => i.id === parseInt(currUserId))
//     console.log('isUserinContacts', isUserinContacts)
//     console.log('ambassador', ambassador)

    ambassador?.id  &&
      dispatch(
        addToContactList({
          user: {
            id: ambassador?.id,
            type: ambassador?.type,
            email: ambassador?.email,
            name: ambassador?.profile?.name,
            avatar: ambassador?.profile?.avatar?.path,
          },
        }),
      )
  }, [ambassador?.id ])

 useEffect(() => {
        currUserId && dispatch(getAmbassadorById(currUserId, currUserType))
  }, [currUserId])

  useEffect(() => {
     currUser && currUser.type === 1 && dispatch(getSimilarUsers(currUserId, UserTypeToString[currUser.type]))
  }, [currUser, currUserId])

  const handleMenuDown = () => setIsHide(!isHide)
  const handleMenuLeft = () => setIsLeft(!isLeft)

  return (
    <>
      {!isLeft ? (
        <div className={root}>
          <div className="chat__wrapper">
            <div className="chat__content">
              <Chat.ChatHeader />
              <Chat.ChatMessageList currUserId={currUserId} />
            </div>
          </div>
          <Chat.ChatFormGroup />
          <Chat.ChatProfile isHide={isHide} handleMenuDown={handleMenuDown} handleMenuLeft={handleMenuLeft} />
        </div>
      ) : currUserType === UserTypeName.Ambassador ? (
        <Profile asModal handleMenuLeft={handleMenuLeft} />
      ) : (
        <UserProfile asModal handleMenuLeft={handleMenuLeft} />
      )}
    </>
  )
}

//TODo needs to fix getAmbassadorById for ssr
// export const getServerSideProps = wrapper.getServerSideProps(async ({ store, params }) => {
//   await store.dispatch(getAmbassadoresList())
//   await store.dispatch(getAmbassadorById(params?.slug, params?.userType))
// })

export default IndexPage
