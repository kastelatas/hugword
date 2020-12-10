import React, { useEffect, useRef, useState } from 'react'
import SVG from 'react-inlinesvg'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '@src/redux/actions/modals'
import { ModalsType } from '@src/ts/enum/modal_enum'
import { TagsList } from '@src/components/Tags'
import Ava from '@src/components/Ava'
import EditableTextArea from '@src/components/Form/TextArea'
import Carousel from '@src/components/Carousel'
import IconButton from '@src/components/Button/IconButton'
import TextEmptyState from '@src/components/EmptyStates/TextEmptyState'
import { updateImg, editUser } from '@src/redux/actions/user'
import { UserTypeToString } from '@src/ts/enum/user_enum'
import Tabs from '@src/components/Tabs/Tabs'
import Pannel from '@src/components/Tabs/Panel'
import ProfilePersonals from '@src/components/Profiles/ProfilePersonals'
import ProfileBilling from '@src/components/Profiles/ProfileBilling'
import ProfileSettings from '@src/components/Profiles/ProfileSettnigs'
import ProfileStatistics from '@src/components/Profiles/ProfileStatistics'
import ProfileMain from '@src/components/Profiles/ProfileMain'
import ProfileAchevment from '@src/components/Profiles/ProfileAchevment'
import AchievIcon from '@src/components/AchievIcon'
import { getProfile } from '@src/redux/actions/profile'
import plusIcon from '../../public/icons/plus-grey.svg'
import closeIcon from '../../public/icons/close.svg'
import pencilIcon from '../../public/icons/pencil.svg'
import SlickCorousel from "@src/components/SlickCarousel";

const MAX_DESCRIPTION_LIMIT = 400

const UserProfile = ({ editMode, asModal, handleMenuLeft }) => {
  const ref = useRef()
  const router = useRouter()
  const dispatch = useDispatch()
  const currUser = useSelector(({ auth: { user } }) => user)
  const ambassador = useSelector(({ ambassador: { ambassador } }) => ambassador)
  const userProfile = useSelector(({ profile: { userProfile } }) => userProfile)
  const [countVal, setCountVal] = useState(null)
  const [offsetTop, setOffsetTop] = useState(false)
  const user = editMode ? currUser : ambassador
  const avaUrl = `${process.env.API_IMG_URL}${user?.profile?.avatar?.path}`
  const noImg = !user?.profile?.avatar
  const abbr = user?.profile?.name[0]
  const root = classNames('profile__person', {
    profile__person_top: offsetTop,
  })

  const goBack = () => router.back()



  useEffect(() => {
    user?.profile?.description && setCountVal(user?.profile?.description.length)
  }, [user?.profile?.description])

  useEffect(() => {
    editMode && currUser?.id && dispatch(getProfile(user?.id, UserTypeToString[user?.type]))
  }, [currUser?.id])

  const handleScroll = (e) => {
    ref.current.scrollTop > 40 ? setOffsetTop(true) : setOffsetTop(false)
  }

  const handleAction = (userId, value) => {
    return editUser(userId, 'client', { description: `${value}` })
  }

  const getTextCount = (val) => {
    setCountVal(val)
  }

  const deleteImg = (id) => {
    const filterImgs = user?.profile?.photos.filter((i) => i.id !== id).map((i) => ({ id: i.id }))
    const data = { photos: filterImgs }
    return dispatch(updateImg(user?.id, UserTypeToString[user.type], data))
  }

  const userPhotos = () =>
    user?.profile?.photos.map((i) => {
      return (
        <div className="photo" key={i.id}>
          <img className="photo__img" src={`${process.env.API_IMG_URL}${i?.image?.path}`} />
          <IconButton closePhoto icon={closeIcon} onClick={() => deleteImg(i.id)} />
        </div>
      )
    })

  return (
    <div className="profile profile_type_user">
      <div className="profile__header">
        {user?.profile?.cover?.path && (
          <img
            className="profile__img"
            src={`${process.env.API_IMG_URL}${user?.profile?.cover?.path}`}
            alt="cover_img"
          />
        )}
        <IconButton close icon={closeIcon} onClick={asModal ? handleMenuLeft : goBack} />
        {editMode && (
          <button
            className="btn btn_change btn_icon"
            type="button"
            onClick={() => dispatch(openModal({ modalType: ModalsType.IMG_UPLOAD, imgType: 'cover_id' }))}
          >
            <SVG src="/icons/camera.svg" />
            <span>Change Photo</span>
          </button>
        )}
        <div className="profile__person-block">
          <div className={root}>
            <div className="profile__ava-container">
              <Ava lg border img={avaUrl} noImg={noImg} abbr={abbr} />
              {editMode && (
                <IconButton
                  edit
                  icon={pencilIcon}
                  type="button"
                  onClick={() => dispatch(openModal({ modalType: ModalsType.IMG_UPLOAD, imgType: 'avatar_id' }))}
                />
              )}
              <div className="profile__degree-block">
                {/*<ProfileDegree />*/}
              </div>
            </div>
            <div className="profile__col">
              <span className="profile__user-name">Status</span>
              <span className="profile__status">{user?.profile?.rankTitle}</span>
              <div className="profile__status-icons">
                <AchievIcon gold />
                <AchievIcon platinum />
                <AchievIcon blue />
              </div>
            </div>
          </div>
          <h3 className="profile__title profile__title_colored">{user?.profile?.name}</h3>
        </div>
        {/* <input type="file" onChange={onSelectFile} /> */}
      </div>
      <div className="profile__wrapper">
        <div className="profile__content" ref={ref} onScroll={handleScroll}>
          <div className="profile__about">
            <div className="profile__aside">
              <div>
                <h3 className="profile__title">
                  About {editMode ? 'You' : user?.profile?.name} {editMode && `(${countVal || 0}/${MAX_DESCRIPTION_LIMIT})`}
                </h3>
                {!editMode ? (
                  <p className="profile__text">{user?.profile?.description}</p>
                ) : (
                  <EditableTextArea
                    limit={MAX_DESCRIPTION_LIMIT}
                    rows={4}
                    user={user}
                    textValue={user?.profile?.description}
                    handleAction={handleAction}
                    getTextCount={getTextCount}
                  />
                )}
              </div>

              {/*{!editMode && (*/}
              {/*  <div className="profile__action">*/}
              {/*    <button className="btn btn_icon">*/}
              {/*      <SVG src="/icons/speech-bubble.svg" />*/}
              {/*      <span>Start chat</span>*/}
              {/*    </button>*/}
              {/*  </div>*/}
              {/*)}*/}
            </div>
          </div>

          {editMode ? (
            <Tabs bottomPanel>
              <Pannel title="Profile">
                <h3 className="profile__title">{editMode ? 'Your' : user?.profile?.name} photos</h3>
                <div className="gallery">
                  <div className="photo photo_add">
                    <IconButton
                      addRing
                      icon={plusIcon}
                      onClick={() => dispatch(openModal({ modalType: ModalsType.IMG_UPLOAD, imgType: 'photos' }))}
                    />
                  </div>
                  <div>
                    {/*<Carousel imgs={user?.profile?.photos} edit/>*/}
                    <SlickCorousel imgs={user?.profile?.photos} edit />
                  </div>
                </div>
                <h3 className="profile__title">
                  What do {editMode ? 'you' : user?.profile?.name} want to talk about now?
                </h3>
                <TagsList editMode={editMode} topics={user?.profile?.topics} />
                {!editMode && <TextEmptyState text="No Topics" show={!user?.profile?.topics?.length} />}
                <IconButton
                  addRing
                  icon={plusIcon}
                  onClick={() => dispatch(openModal({ modalType: ModalsType.TOPIC }))}
                />

                {/*<h3 className="profile__title">*/}
                {/*  Popular themes of {editMode ? 'your' : user?.profile?.name} previous chats*/}
                {/*</h3>*/}

                {/*<TagsList topics={user?.profile?.secondaryTopics} />*/}
                {/*<TextEmptyState text="No Popular Topics" show={!user?.profile?.secondaryTopics?.length} />*/}

                {/* <h3 className="profile__title">Custom background for your profile</h3> */}

                {/* <div className="gallery"> */}
                {/*  <div className="photo photo_add"> */}
                {/*    <IconButton */}
                {/*      addRing */}
                {/*      icon={plusIcon} */}
                {/*      onClick={() => dispatch(openModal({ modalType: ModalsType.IMG_UPLOAD, imgType: 'photos' }))} */}
                {/*    /> */}
                {/*  </div> */}
                {/*  <div className="photo"> */}
                {/*    <img className="photo__img" src={`${process.env.API_IMG_URL}${user?.image?.path}`} /> */}
                {/*    <IconButton closePhoto icon={closeIcon} onClick={() => deleteImg(i.id)} /> */}
                {/*  </div> */}
                {/* </div> */}

                <h3 className="profile__title">Personal data</h3>
                <ProfilePersonals />
              </Pannel>

              <Pannel title="Statistics">
                <ProfileStatistics user tooltip />
              </Pannel>

              {/*<Pannel title="Achievments">*/}
              {/*  <ProfileAchevment user />*/}
              {/*</Pannel>*/}

              <Pannel title="Talkins">
                <ProfileBilling />
              </Pannel>

              <Pannel title="Settings">
                <h3 className="profile__title">Notifications settings</h3>
                <ProfileSettings data={user?.setting} userData={user}/>
              </Pannel>
            </Tabs>
          ) : (
            <ProfileMain />
          )}

          {/* {editMode && (
            <>
              <h3 className="profile__title">Your Chat & Hug Search Avatars</h3>
              <div className="profile__present">
                <Ava rec img={avaUrl} noImg={noImg} abbr={abbr}>
                  <button
                    className="btn btn_change btn_icon"
                    onClick={() => dispatch(openModal({ modalType: ModalsType.IMG_UPLOAD, imgType: 'avatar_id' }))}
                    type="button"
                  >
                    <SVG src="/icons/plus-grey.svg" />
                    <span>Change Photo</span>
                  </button>
                </Ava>
                <Ava lg img={avaUrl} noImg={noImg} abbr={abbr} />
                <Ava img={avaUrl} noImg={noImg} abbr={abbr} />
                <Ava sm img={avaUrl} noImg={noImg} abbr={abbr} />
              </div>
            </>
           )} */}

          {/* <div className="profile__action">
            <button className="btn-outline-primary btn_block" type="button">
              Cancel
            </button>
            <button className="btn btn_block" type="button">
              Save
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
