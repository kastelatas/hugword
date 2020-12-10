import React, { useState } from 'react'
import {updateImg, updateVideoFile} from '@src/redux/actions/user'
import { UserTypeToString } from '@src/ts/enum/user_enum'
import { useDispatch, useSelector } from 'react-redux'
import CarouselMulti from 'react-multi-carousel'
import IconButton from '@src/components/Button/IconButton'
import Lightbox from 'react-image-lightbox'
import closeIcon from '../../public/icons/close.svg'
import Slider from "react-slick";
import {relative} from "jest-haste-map/build/lib/fast_path";
import Player from "@src/components/Player";


const SlickCorousel = ({ imgs, video, edit }) => {

  console.log(imgs)

  let settingsImgs = {
    dots: false,
    infinite: false,
    slidesToShow:2,
    slidesToScroll: 2,
    initialSlide: 0,
    draggable:true
  };

  let settingsVideos = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 2,
    initialSlide: 0,
  };


  const dispatch = useDispatch()
  const currUser = useSelector(({ auth: { user } }) => user)

  const deleteImg = (id, imgs) => {
    const filterImgs = imgs.filter((i) => i.id !== id).map((i) => ({ id: i.id }))
    const data = { photos: filterImgs }
    return dispatch(updateImg(currUser?.id, UserTypeToString[currUser.type], data))
  }


  const deleteVideo = (id) => {
    const filterImgs = currUser?.profile?.videos.filter((i) => i.id !== id).map((i) => ({ id: i.id }))
    const data = { videos: filterImgs }
    return dispatch(updateVideoFile(currUser?.id, UserTypeToString[currUser.type], data))
  }

  const [state, setState] = useState({
    photoIndex: 0,
    isOpen: false,
  })
  return (
    <div className="carousel carousel__profile">
      {Boolean(video?.length) && (
          <Slider
              {...settingsVideos}
          >
            {video.length &&
            video?.map((i, idx) => {
              return (
                  // <Player key={i.id} path={i.video.path} />
                  <React.Fragment key={i.id}>
                    <div key={idx}>
                      <Player key={i.id} path={i.video.path} />
                      {edit && <IconButton closePhoto icon={closeIcon} onClick={() => deleteVideo(i.id)} />}
                    </div>
                  </React.Fragment>
              )
            })}
          </Slider>
      )}

      {Boolean(imgs?.length) && (
        <Slider
            {...settingsImgs}
        >
          {imgs.length &&
            imgs?.map((i, idx) => {
              return (
                <div key={i.id} style={{
                  position:relative
                }}>
                  <div
                    className="carousel-item__img"
                    onClick={() => setState({ photoIndex: idx, isOpen: true })}
                    style={{
                      height: 118,
                      borderRadius: 5,
                      width: 108,
                      backgroundSize: 'cover',
                      backgroundImage: `url(${process.env.API_IMG_URL}${i?.image.path})`,
                    }}
                  />
                  {edit && <IconButton closePhoto icon={closeIcon} onClick={() => deleteImg(i.id, imgs)} />}
                </div>
              )
            })}
        </Slider>
      )}
      {state.isOpen && (
        <Lightbox
          mainSrc={`${process.env.API_IMG_URL}${imgs[state.photoIndex]?.image?.path}`}
          nextSrc={imgs[(state.photoIndex + 1) % imgs.length]}
          prevSrc={imgs[(state.photoIndex + imgs.length - 1) % imgs.length]}
          onCloseRequest={() => setState({ photoIndex: 0, isOpen: false })}
          onMovePrevRequest={() =>
            setState({
              ...state,
              photoIndex: (state.photoIndex + imgs.length - 1) % imgs.length,
            })
          }
          onMoveNextRequest={() =>
            setState({
              ...state,
              photoIndex: (state.photoIndex + 1) % imgs.length,
            })
          }
        />
      )}
    </div>
  )
}

export default SlickCorousel
