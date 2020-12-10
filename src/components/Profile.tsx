import SVG from 'react-inlinesvg'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import Carousel from '@src/components/Carousel'
import Button from '@src/components/Button/Button'
import IconButton from '@src/components/Button/IconButton'
import { TagsList } from '@src/components/Tags'
import TextEmptyState from '@src/components/EmptyStates/TextEmptyState'
import Vote from '@src/components/Vote'
import CommentsList from '@src/components/Comments/CommentsList'
import { UserTypeConvertTooUrl, UserTypeToString } from '@src/ts/enum/user_enum'
import Ava from '@src/components/Ava'
import { openModal } from '@src/redux/actions/modals'
import { ModalsType } from '@src/ts/enum/modal_enum'
import { editUser, getReviews, updateImg } from '@src/redux/actions/user'
import EditableTextArea from '@src/components/Form/TextArea'
import Tabs from '@src/components/Tabs/Tabs'
import Pannel from '@src/components/Tabs/Panel'
import ProfilePersonals from '@src/components/Profiles/ProfilePersonals'
import ProfileStatistics from '@src/components/Profiles/ProfileStatistics'
import ProfileAchevment from '@src/components/Profiles/ProfileAchevment'
import ProfileBilling from '@src/components/Profiles/ProfileBilling'
import ProfileSettings from '@src/components/Profiles/ProfileSettnigs'
import ProfileMain from '@src/components/Profiles/ProfileMain'
import PriceSettings from '@src/components/PriceSettings'
import plusIcon from '../../public/icons/plus-grey.svg'
import bubbleIcon from '../../public/icons/speech-bubble.svg'
import closeIcon from '../../public/icons/close.svg'
import pencilIcon from '../../public/icons/pencil.svg'
import { getProfile } from "@src/redux/actions/profile";
import _ from 'lodash'
import SlickCorousel from "@src/components/SlickCarousel";
import Footer from "@src/components/Footer";

const Profile = ({ asModal, editMode, isMiniProfile, handleMenuLeft }) => {
  const ref = useRef()
  const router = useRouter()
  const dispatch = useDispatch()
  const [countVal, setCountVal] = useState(null)
  const [offsetTop, setOffsetTop] = useState(false)
  const [offsetTopShow, setOffsetTopShow] = useState(true)
  const [chatOff, setChatOff] = useState(false)
  const [isVideos, setIsVideos] = useState(false)
  const ambassador = useSelector(({ ambassador: { ambassador } }) => ambassador)
  // const reviews = useSelector(({ user: { reviews } }) => reviews)
  const currUser = useSelector(({ auth: { user } }) => user)


  const btnChatOff = router.pathname.substr(1,4)

  useEffect(() => {
    if(btnChatOff == 'chat') {
      setChatOff(!chatOff)
    }
  }, [btnChatOff])



  const user = editMode ? currUser : ambassador
  const commentsCount = user?.profile?.comments?.length
  const isComments = Boolean(commentsCount)



  const root = classNames('profile__person', {
    profile__person_hide: offsetTop ,
  })

  const showAva = classNames({
    profile__person_show: false,
  })


  useEffect(()=>{
   if( user?.profile?.videos && user?.profile?.videos.length == 0 ) {
      setIsVideos(true)
    } else {
     setIsVideos(false)
   }
  },[user?.profile?.videos])

  const videoClass = classNames('video video_add', {
    video_add_float: isVideos
  })

  useEffect(() => {
    // currUser?.id && dispatch(getReviews(currUser?.id))
    currUser?.id && dispatch(getProfile(currUser.id, UserTypeToString[currUser.type]))
  }, [currUser?.id])

  useEffect(() => {
    user?.profile?.description && setCountVal(user?.profile?.description.length)
  }, [user?.profile?.description])


  const goBack = () => router.back()

  const handleScroll = (e) => {
    ref.current.scrollTop > 10 ? setOffsetTop(true) : setOffsetTop(false)
    ref.current.scrollTop > 10 ? setOffsetTopShow(false) : setOffsetTopShow(true)
  }

  const getTextCount = (val) => {
    setCountVal(val)
  }
  const handleAction = (userId, value) => {
    return editUser(userId, 'ambassador', { description: `${value}` })
  }

  // const userPhotos = () =>
  //   user?.profile?.photos.map((i) => {
  //     return (
  //       <div className="photo" key={i.id}>
  //         <img className="photo__img" src={`${process.env.API_IMG_URL}${i?.image?.path}`} />
  //         <IconButton closePhoto icon={closeIcon} onClick={() => deleteImg(i.id)} />
  //       </div>
  //     )
  //   })

  const deleteImg = (id) => {
    const filterImgs = user?.profile?.photos.filter((i) => i.id !== id).map((i) => ({ id: i.id }))
    const data = { photos: filterImgs }
    return dispatch(updateImg(user?.id, UserTypeToString[user.type], data))
  }

  return (
    <div className="profile">
      <div className="profile__header">
        {user?.profile?.cover?.path && (
          <img className="profile__img" src={`${process.env.API_IMG_URL}${user?.profile?.cover?.path}`} alt="img" />
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
          <div>
            {/*<div className={root}>*/}
            {/*  {user?.profile?.photo?.path && (*/}
            {/*    <img*/}
            {/*      className="profile__img"*/}
            {/*      src={`${process.env.API_IMG_URL}${user?.profile?.photo?.path}`}*/}
            {/*      alt="img"*/}
            {/*    />*/}
            {/*  )}*/}
            {/*  {editMode && (*/}
            {/*    <button*/}
            {/*      className="btn btn_change btn_icon"*/}
            {/*      type="button"*/}
            {/*      onClick={() => dispatch(openModal({ modalType: ModalsType.IMG_UPLOAD, imgType: 'photo_id' }))}*/}
            {/*    >*/}
            {/*      <SVG src="/icons/camera.svg" />*/}
            {/*      <span>Change Photo</span>*/}
            {/*    </button>*/}
            {/*  )}*/}
            {/*</div>*/}
            <div className={showAva} style={{ marginRight: '40px' }}>
              <div className="profile__ava-container">
                {user?.profile?.photo?.path && (
                  <Ava lg border img={`${process.env.API_IMG_URL}${user?.profile?.photo?.path}`} />
                )}
                {editMode && (
                  <IconButton
                    edit
                    icon={pencilIcon}
                    type="button"
                    onClick={() => dispatch(openModal({ modalType: ModalsType.IMG_UPLOAD, imgType: 'photo_id' }))}
                  />
                )}
                <div className="profile__degree-block">{/* <ProfileDegree /> */}</div>
              </div>
            </div>
          </div>
          <div className="profile__block-rate">
            <h3 className="profile__title profile__title_colored">{user?.profile?.name}</h3>
            <div className="profile__row ">
              <Vote placeholderRating={user?.profile?.rating?.rating} readonly />
              {/* <ProfileDegree /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="profile__wrapper">
        <div className="profile__content" ref={ref} onScroll={handleScroll}>
          <div className="profile__row">
            <div className="profile__about profile__about_pad">
              <div className="profile__aside">
                <div>
                  <h3 className="profile__title">
                    About {editMode ? 'You' : user?.profile?.name} {editMode && `(${countVal}/300)`}
                  </h3>
                  {editMode ? (
                    <EditableTextArea
                      rows={4}
                      user={user}
                      getTextCount={getTextCount}
                      limit={300}
                      textValue={user?.profile?.description}
                      handleAction={handleAction}
                    />
                  ) : (
                    <>
                      <p className="profile__text">{user?.profile?.description}</p>
                      <div className="profile__decription">
                        <div className="profile__icon">
                          <SVG src="/icons/main-billing.svg" />
                        </div>
                        <span className="profile__decription-text">
                          Cost of one massage:
                          <span className="profile__decription-mark">{user?.profile?.price} talken</span>
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="profile__comments">
              <div className="profile__title">Reviews ({commentsCount})</div>
              <div className="profile__comments-content">
                <CommentsList comments={_.uniqBy(user?.profile?.comments, (i) => i.client_id)} ava={false} profile={true} profileComments={false} />
                <TextEmptyState text="No Comments" show={!isComments} />
              </div>
            </div>
          </div>

          <div className="profile__row profile__about_pad profile__fix-row">
            <div className="profile__col profile__row-settings">
              {editMode ? (
                <PriceSettings />
              ) : chatOff || !currUser ? '' : (
                  <Button
                      icon={bubbleIcon}
                      to="/chat/[userType]/[slug]"
                      as={`/chat/${UserTypeConvertTooUrl[currUser?.type]}/${user?.id}`}
                  >
                    Start chat
                  </Button>
              )}
            </div>
            {
              isComments && editMode ? (
                  <Button className="btn_mx-w" to="/reviews" as={`/reviews`}>
                    Show more
                  </Button>
            ) : (
                  <Button className="btn_mx-w" to="/reviews/[id]" as={`/reviews/${user?.id}`}>
                    Show more
                  </Button>
              )

            }

            {/*{*/}
            {/*//   editMode ? (*/}
            {/*//       <Button className="btn_mx-w" to="/reviews" as={`/reviews`}>*/}
            {/*//         Show more*/}
            {/*//       </Button>*/}
            {/*//   ) : (*/}
            {/*//       <Button className="btn_mx-w" to="/reviews/[id]" as={`/reviews/${user?.id}`}>*/}
            {/*//         Show more*/}
            {/*//       </Button>*/}
            {/*//   )*/}
            {/*// }*/}
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
                    {/*<Carousel imgs={user?.profile?.photos} edit />*/}
                    <SlickCorousel imgs={user?.profile?.photos} edit />
                  </div>
                  {/* {userPhotos()} */}
                </div>

                <h3 className="profile__title">{editMode ? 'Your' : user?.profile?.name} videos</h3>

                <div className="video-gallery">
                  <div className={videoClass}>
                    <button
                      className="btn-icon btn-icon_type_add-ring"
                      type="button"
                      onClick={() => dispatch(openModal({ modalType: ModalsType.VIDEO_UPLOAD }))}
                    >
                      <span className="btn-icon__content">
                        <SVG src="/icons/plus-grey.svg" />
                      </span>
                    </button>
                  </div>
                  {/* <Carousel imgs={user?.profile?.photos} edit /> */}
                  {/*<Carousel video={user?.profile?.videos} edit />*/}
                  <SlickCorousel  video={user?.profile?.videos} edit />
                </div>

               <div>
                 <h3 className="profile__title">
                   {' '}
                   What do {editMode ? 'you' : user?.profile?.name} want to talk about now?{' '}
                 </h3>
                 <TagsList editMode={editMode} topics={user?.profile?.topics} />
                 {!editMode && <TextEmptyState text="No Topics" show={!user?.profile?.topics?.length} />}
                 <IconButton
                     addRing
                     icon={plusIcon}
                     onClick={() => dispatch(openModal({ modalType: ModalsType.TOPIC }))}
                 />

               </div>
                {
                  !user?.profile?.secondaryTopics.length == 0 && (
                      <div>
                        <h3 className="profile__title">
                          Popular themes of {editMode ? 'your' : user?.profile?.name} previous chats{' '}
                        </h3>

                        <TagsList topics={user?.profile?.secondaryTopics} />
                        <TextEmptyState text="No Popular Topics" show={!user?.profile?.secondaryTopics?.length} />
                      </div>
                  )
                }

                {/* <h3 className="profile__title">Custom background for your profile</h3> */}

                {/* <div className="gallery"> */}
                {/*  <div className="photo photo_add"> */}
                {/*    <IconButton */}
                {/*        addRing */}
                {/*        icon={plusIcon} */}
                {/*        onClick={() => dispatch(openModal({ modalType: ModalsType.IMG_UPLOAD, imgType: 'photos' }))} */}
                {/*    /> */}
                {/*  </div> */}
                {/*  <div className="photo"> */}
                {/*    <img className="photo__img" src={`${process.env.API_IMG_URL}${user?.image?.path}`} /> */}
                {/*    <IconButton closePhoto icon={closeIcon} onClick={() => deleteImg(i.id)} /> */}
                {/*  </div> */}
                {/* </div> */}

                <h3 className="profile__title">Personal data</h3>
                <ProfilePersonals />

                {/* {editMode && ( */}
                {/*    <> */}
                {/*      <h3 className="profile__title">Your Chat & Hug Search Avatars</h3> */}
                {/*      <div className="profile__present"> */}
                {/*        <div className="ava ava_rectangle"> */}
                {/*          <img className="ava__img" src={`${process.env.API_IMG_URL}${user?.profile?.avatar?.path}`} /> */}
                {/*          <button */}
                {/*              className="btn btn_change btn_icon" */}
                {/*              onClick={() => dispatch(openModal({ modalType: ModalsType.IMG_UPLOAD, imgType: 'avatar_id' }))} */}
                {/*              type="button" */}
                {/*          > */}
                {/*            <SVG src="/icons/plus-grey.svg" /> */}
                {/*            <span>Change Photo</span> */}
                {/*          </button> */}
                {/*        </div> */}
                {/*        <Ava lg img={`${process.env.API_IMG_URL}${user?.profile?.avatar?.path}`} /> */}
                {/*        <Ava img={`${process.env.API_IMG_URL}${user?.profile?.avatar?.path}`} /> */}
                {/*        <Ava sm img={`${process.env.API_IMG_URL}${user?.profile?.avatar?.path}`} /> */}
                {/*      </div> */}
                {/*    </> */}
                {/* )} */}
                {/* <h3 className="profile__title">{user?.profile?.name} photos</h3> */}
                {/* {!editMode && <TextEmptyState text="No Photos" show={!user?.profile?.photos.length} />} */}

                {/* <h3 className="profile__title"> */}
                {/*  Topics of conversation {editMode && `(${user?.profile?.topics?.length}/${MAX_MAIN_TOPICS_COUNT})`} */}
                {/* </h3> */}

                {/* <TagsList editMode={editMode} topics={user?.profile?.topics} /> */}
                {/* {editMode && user?.profile?.topics?.length < 5 && ( */}
                {/*    <IconButton addRing icon={plusIcon} onClick={() => dispatch(openModal({ modalType: ModalsType.TOPIC }))} /> */}
                {/* )} */}
                {/* <TextEmptyState text="No Popular Topics" show={!user?.profile?.topics?.length} /> */}

                {/* <h3 className="profile__title"> */}
                {/*  Your Secondary Topics of conversation{' '} */}
                {/*  {editMode && `(${user?.profile?.secondaryTopics.length}/${MAX_SECONDARY_TOPICS_COUNT})`} */}
                {/* </h3> */}

                {/* <TagsList editMode={editMode} topics={user?.profile?.secondaryTopics} /> */}
                {/* <TextEmptyState text="No Popular Topics" show={!user?.profile?.secondaryTopics?.length} /> */}

                {/* <h3 className="profile__title">Personal data</h3> */}
                {/* <ProfilePersonals /> */}
              </Pannel>

              <Pannel title="Statistics">
                <ProfileStatistics />
              </Pannel>

              {/*<Pannel title="Achievments">*/}
              {/*  <ProfileAchevment />*/}
              {/*</Pannel>*/}

              <Pannel title="Billing">
                <ProfileBilling />
              </Pannel>

              <Pannel title="Settings">
                <h3 className="profile__title">Notifications settings</h3>
                <ProfileSettings data={user?.setting} />
              </Pannel>
            </Tabs>
          ) : (
            <ProfileMain />
          )}

          {/* <div className="tags-block">
            <div className="tag tag_close">
              <span>Fashion</span>
              <button className="btn-icon" type="button">
                <SVG src="/icons/plus-grey.svg" />
              </button>
            </div>
            <div className="tag tag_close">
              <span>Vegan and eco living</span>
              <button className="btn-icon" type="button">
                <SVG src="/icons/plus-grey.svg" />
              </button>
            </div>
            <div className="tag tag_close">
              <span>Healthy life style</span>
              <button className="btn-icon" type="button">
                <SVG src="/icons/plus-grey.svg" />
              </button>
            </div>
            <div className="tag tag_close">
              <span>Relationship tips and dating advice</span>
              <button className="btn-icon" type="button">
                <SVG src="/icons/plus-grey.svg" />
              </button>
            </div>
            <button className="btn-icon btn-icon_type_add-ring" type="button">
              <span className="btn-icon__content">
                <SVG src="/icons/plus-grey.svg" />
              </span>
            </button>
          </div> */}

          {/* <div className="profile__action">
            <button className="btn btn_block" type="button">Cancel</button>
            <button className="btn btn_block" type="button">Save</button>
          </div> */}
        </div>
        {
          !editMode && <Footer/>
        }
      </div>

    </div>
  )
}

// export const getServerSideProps = wrapper.getStaticProps(async ({ store }) => {
//   await store.dispatch(getReviews())
// })

export default Profile
