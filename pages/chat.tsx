import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import { NextPage } from 'next'
import * as Chat from '@src/components/Chat'
import { wrapper, State } from '@src/redux/store'
import { getAmbassadoresList, getAmbassadorById } from '@src/redux/actions/ambassador'
import { useDispatch, useSelector } from 'react-redux'
import { UserTypeConvertTooUrl } from '@src/ts/enum/user_enum'
import TextEmptyState from "@src/components/EmptyStates/TextEmptyState";
import WithAuth from "@src/hoc/withAuthRoute"

const IndexPage: NextPage<State> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const contacts = useSelector(({ chat: { contacts } }) => contacts)
  const currUser = useSelector(({ auth: { user } }) => user)
  const [isHide, setIsHide] = useState(true)
  const [isLeft, setIsLeft] = useState(false)

  const root = classnames('chat', {
    chat_profile_hide: isHide,
  })

  useEffect(() => {
    // Boolean(contacts?.length) && dispatch(getAmbassadorById(contacts[0]?.user.id))
    Boolean(contacts?.length) && setIsHide(true)
    Boolean(contacts?.length) &&
      router.push('/chat/[userType]/[slug]', `/chat/${UserTypeConvertTooUrl[currUser?.type]}/${contacts[0]?.user?.id}`)
  }, [Boolean(contacts?.length)])

  const handleMenuDown = () => setIsHide(!isHide)
  const handleMenuLeft = () => setIsLeft(!isLeft)

  return (
    <div className={root}>
      <div className="chat__wrapper">
        <TextEmptyState text="Please select the contact" show={isHide} centered />
        <div className="chat__content">
          <Chat.ChatHeader />
          <Chat.ChatMessageList />
        </div>
      </div>
      <Chat.ChatFormGroup disabled={isHide}/>
      <Chat.ChatProfile isHide={isHide} handleMenuDown={handleMenuDown} handleMenuLeft={handleMenuLeft} />
    </div>
  )
}

/*export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  await store.dispatch(getAmbassadoresList())
})*/

export default IndexPage
