import React, { useEffect } from 'react'
import classNames from 'classnames'
import {useDispatch, useSelector} from 'react-redux'
import TagsContainer from '@src/Containers/TagsContainer'
import Ava from '@src/components/Ava'
import IconButton from '@src/components/Button/IconButton'
import Carousel from '@src/components/Carousel'
import { UserType } from '@src/ts/enum/user_enum'
import Vote from '@src/components/Vote'
import { useRouter } from 'next/router'
import TextEmptyState from '@src/components/EmptyStates/TextEmptyState'
import arrowDownIcon from '../../../public/icons/arrow-down.svg'
import arrowUpIcon from '../../../public/icons/arrow-up.svg'
import Button from "@src/components/Button/Button";
import {openModal} from "@src/redux/actions/modals";
import {ModalsType} from "@src/ts/enum/modal_enum";

interface ChatProfileProps {
  isHide: boolean
  currUserId: number
  handleMenuDown: () => void
  handleMenuLeft: () => void
}

const ChatProfile: React.FC<ChatProfileProps> = (props) => {
  const { isHide, handleMenuDown, handleMenuLeft } = props
  const user = useSelector(({ ambassador: { ambassador } }) => ambassador)
  const authUser = useSelector(({ auth: { user } }) => user)
  const userList = useSelector(({ chat }) => chat)
  const currUser = user || (Boolean(userList.length) && userList?.contacts[0]?.user)
  const dispatch = useDispatch()
  const status = classNames('chat__profile-status', {
    'chat__profile-status_online': currUser?.state?.online,
  })

  return (
    <div className="chat__profile">
      {currUser && (
        <IconButton
          icon={isHide ? arrowUpIcon : arrowDownIcon }
          className="chat__profile-icon-down chat__profile-icon-down_hide"
          onClick={() => handleMenuDown()}
        />
      )}
      {isHide && <span className="chat__profile-title">{currUser?.profile?.name}</span>}
      {!isHide && currUser && (
        <>
          <IconButton icon={arrowDownIcon} className="chat__profile-icon-left" onClick={() => handleMenuLeft()} />
          <Ava
            lg
            img={`${process.env.API_IMG_URL}${currUser?.profile?.avatar?.path}`}
            noImg={!currUser?.profile?.avatar}
            abbr={currUser?.profile?.name[0]}
          />
          <span className="chat__profile-title">{currUser?.profile?.name}</span>
          <span className={status}>{currUser?.state?.online ? 'Online' : 'Offline'}</span>
         <div className="chat__profile-vote-overlay">
           {user?.type === UserType.Ambassador && (
               <Vote placeholderRating={currUser?.profile?.rating?.rating} readonly />
           )}
         </div>
          <br/>
          {
            user?.type === 2 && !user?.profile?.comments?.find(i => i.client_id === authUser?.id) && ( <Button onClick={() => dispatch(openModal({ modalType: ModalsType.FILL_WITH }))}>LEAVE A REVIEW</Button>)
          }

          <h2>Topics of conversation</h2>
          <TagsContainer topics={currUser?.profile?.topics} />
          <TextEmptyState text="No Topics" show={!currUser?.profile?.topics?.length} />
          <h2>{user?.profile?.name} photos</h2>
          {Boolean(currUser?.profile?.photos?.length) && <Carousel isMiniProfile imgs={currUser?.profile?.photos} />}
          <TextEmptyState text="No Photos" show={!currUser?.profile?.photos?.length} />
          <h2>About {currUser?.profile?.name}</h2>
          <p className="chat__description">{currUser?.profile?.description}</p>
          <TextEmptyState text="No Text About" show={!currUser?.profile?.description} />
        </>
      )}
    </div>
  )
}

export default ChatProfile
