import React, { useState } from 'react'
import CarouselMulti from 'react-multi-carousel'
import IconButton from '@src/components/Button/IconButton'
import Lightbox from 'react-image-lightbox'
import { updateImg, updateVideoFile } from '@src/redux/actions/user'
import { UserTypeToString } from '@src/ts/enum/user_enum'
import { useDispatch, useSelector } from 'react-redux'
import Player from '@src/components/Player'
import arrowLeftIcon from '../../public/icons/arrow-left.svg'
import arrowRightIcon from '../../public/icons/arrow-right.svg'
import closeIcon from '../../public/icons/close.svg'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
    partialVisibilityGutter: 40,
  },
  largeDesktop: {
    breakpoint: { max: 3000, min: 2000 },
    items: 8,
    partialVisibilityGutter: 40,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1880 },
    items: 8,
    partialVisibilityGutter: 20,
  },
  desktop2: {
    breakpoint: { max: 1024, min: 1880 },
    items: 8,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1880, min: 464 },
    items: 4,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 40,
  },
}

const miniProfileResponsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 0 },
    items: 2,
    partialVisibilityGutter: 20,
  },
}

const CustomButtonGroupAsArrowsImgs = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest

  const { totalItems } = rest.carouselState
  const SlidesToShow = rest.carouselState.slidesToShow

  if (SlidesToShow + 2 < totalItems) {
    return (
      <div className="carousel__button-group">
        <IconButton
          icon={arrowLeftIcon}
          className={currentSlide === 0 ? 'disable carousel__button-left' : 'carousel__button-left'}
          onClick={() => previous()}
        />
        <i className="carousel__separator">|</i>
        <IconButton onClick={() => next()} icon={arrowRightIcon} className="carousel__button-right" />
      </div>
    )
  }
  return null
}

const CustomButtonGroupAsArrowsVideos = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest

  const { totalItems } = rest.carouselState
  const SlidesToShow = rest.carouselState.slidesToShow
  //
  // if (SlidesToShow < totalItems) {
  //   return (
  //     <div className="carousel__button-group">
  //       <IconButton
  //         icon={arrowLeftIcon}
  //         className={currentSlide === 0 ? 'disable carousel__button-left' : 'carousel__button-left'}
  //         onClick={() => previous()}
  //       />
  //       <i className="carousel__separator">|</i>
  //       <IconButton onClick={() => next()} icon={arrowRightIcon} className="carousel__button-right" />
  //     </div>
  //   )
  // }
  return (
      <div className="carousel__button-group">
        <IconButton
            icon={arrowLeftIcon}
            className={currentSlide === 0 ? 'disable carousel__button-left' : 'carousel__button-left'}
            onClick={() => previous()}
        />
        <i className="carousel__separator">|</i>
        <IconButton onClick={() => next()} icon={arrowRightIcon} className="carousel__button-right" />
      </div>
  )
}

const Carousel = ({ imgs, isMiniProfile, video, edit }) => {
  const dispatch = useDispatch()
  const currUser = useSelector(({ auth: { user } }) => user)
  const ambassador = useSelector(({ ambassador: { ambassador } }) => ambassador)

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
        <CarouselMulti
          renderButtonGroupOutside
          customButtonGroup={<CustomButtonGroupAsArrowsVideos />}
          responsive={isMiniProfile ? miniProfileResponsive : responsive}
          infinite
          // partialVisible
          ssr={false}
          renderDotsOutside={false}
          showDots={false}
          arrows={false}
          slidesToSlide={3}
          swipeable
          centerMode
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
        </CarouselMulti>
      )}

      {Boolean(imgs?.length) && (
        <CarouselMulti
          renderButtonGroupOutside
          customButtonGroup={<CustomButtonGroupAsArrowsImgs />}
          responsive={isMiniProfile ? miniProfileResponsive : responsive}
          infinite={false}
          partialVisible
          ssr={false}
          renderDotsOutside={false}
          showDots={false}
          arrows={false}
          slidesToSlide={1}
          swipeable
        >
          {imgs.length &&
            imgs?.map((i, idx) => {
              return (
                <React.Fragment key={i.id}>
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
                </React.Fragment>
              )
            })}
        </CarouselMulti>
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

export default Carousel
