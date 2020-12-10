import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '@src/redux/actions/modals'
import { ModalsType } from '@src/ts/enum/modal_enum'
import { TagsList } from '@src/components/Tags'
import Carousel from '@src/components/Carousel'
import IconButton from '@src/components/Button/IconButton'
import TextEmptyState from '@src/components/EmptyStates/TextEmptyState'
import { updateImg, editUser } from '@src/redux/actions/user'
import { UserTypeToString } from '@src/ts/enum/user_enum'

import Player from '@src/components/Player'
import SVG from 'react-inlinesvg'
import plusIcon from '../../../public/icons/plus-grey.svg'
import closeIcon from '../../../public/icons/close.svg'
import SlickCorousel from "@src/components/SlickCarousel";
import Footer from "@src/components/Footer";

const ProfileMain = ({ editMode, asModal, handleMenuLeft }) => {
  const ref = useRef()
  const router = useRouter()
  const dispatch = useDispatch()
  const currUser = useSelector(({ auth: { user } }) => user)
  const ambassador = useSelector(({ ambassador: { ambassador } }) => ambassador)
  const [offsetTop, setOffsetTop] = useState(false)
  const user = editMode ? currUser : ambassador
  const avaUrl = `${process.env.API_IMG_URL}${user?.profile?.avatar?.path}`
  const noImg = !user?.profile?.avatar
  const abbr = user?.profile?.name[0]

  const deleteImg = (id) => {
    const filterImgs = user?.profile?.photos.filter((i) => i.id !== id).map((i) => ({ id: i.id }))
    const data = { photos: filterImgs }
    return dispatch(updateImg(user?.id, UserTypeToString[user.type], data))
  }

  return (
    <>
      <h3 className="profile__title">{user?.profile?.name} photos</h3>
      <div>
        {/*{Boolean(user?.profile?.photos?.length) && <Carousel imgs={user?.profile?.photos} />}*/}
        {Boolean(user?.profile?.photos?.length) && <SlickCorousel imgs={user?.profile?.photos}  />}
        <TextEmptyState text="No Photos" show={!user?.profile?.photos?.length} />
      </div>

      {Boolean(user?.profile?.videos?.length) && (
        <>
          <h3 className="profile__title">{editMode ? 'Your' : user?.profile?.name} videos</h3>

          <div className="video-gallery">
            <div className="video-gallery__content">
              {/* {user?.profile?.videos && */}
              {/* user?.profile?.videos.map((i) => { */}
              {/*  return <Player key={i.id} path={i.video.path} /> */}
              {/* })} */}
              {/*<Carousel video={user?.profile?.videos} />*/}
                <SlickCorousel  video={user?.profile?.videos} edit />
            </div>
            <TextEmptyState text="No Videos" show={!user?.profile?.videos?.length} />
          </div>
        </>
      )}

      <h3 className="profile__title">
        {editMode ? 'What do you want to talk about now?' : `Right now ${user?.profile?.name} wants to talk about`}
      </h3>
      <TagsList editMode={editMode} topics={user?.profile?.topics} />
      {!editMode && <TextEmptyState text="No Topics" show={!user?.profile?.topics?.length} />}
      {editMode && (
        <IconButton addRing icon={plusIcon} onClick={() => dispatch(openModal({ modalType: ModalsType.TOPIC }))} />
      )}

      {/*<h3 className="profile__title">*/}
      {/*  {editMode ? 'Popular themes of your previous chats' : `Popular themes of ${user?.profile?.name} previous chats`}*/}
      {/*</h3>*/}
      {/*<TagsList editMode={editMode} topics={user?.profile?.secondaryTopics} />*/}
      {/*<TextEmptyState text="No Popular Topics" show={!user?.profile?.secondaryTopics?.length} />*/}



    </>
  )
}

export default ProfileMain
