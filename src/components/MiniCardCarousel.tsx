import React from 'react'
import CarouselMulti from 'react-multi-carousel'
import IconButton from '@src/components/Button/IconButton'
import Ava from '@src/components/Ava'
import { UserTypeConvertTooUrl, UserTypeToString } from '@src/ts/enum/user_enum'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import arrowLeftIcon from '../../public/icons/arrow-left.svg'
import arrowRightIcon from '../../public/icons/arrow-right.svg'
import speecheIcon from '../../public/icons/speech-bubble.svg'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
    partialVisibilityGutter: 30,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1880 },
    items: 3,
    partialVisibilityGutter: 5,
  },
  desktop2: {
    breakpoint: { max: 1024, min: 1600 },
    items: 3,
    partialVisibilityGutter: 20,
  },
  tablet: {
    breakpoint: { max: 1600, min: 464 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
    partialVisibilityGutter: 40,
  },
}

const miniProfileResponsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 0 },
    items: 2,
    partialVisibilityGutter: 30,
  },
}

const CustomButtonGroupAsArrows = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest

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

const MiniCardCarousel = ({ data, numberOfCards }) => {
  const currUser = useSelector(({ auth: { user } }) => user)
  return (
    <div className="carousel carousel-mini">
      {data && (
        <CarouselMulti
          renderButtonGroupOutside
          customButtonGroup={<CustomButtonGroupAsArrows />}
          responsive={miniProfileResponsive}
          infinite
          partialVisible
          ssr={false}
          renderDotsOutside={false}
          showDots={false}
          arrows={false}
          slidesToSlide={1}
          swipeable
          autoPlay
          autoPlaySpeed={5000}
        >
          {data?.map((i) => {
            return (
              <div className="mini-card" key={i.id}>
                <Ava online={i?.state?.online} sm img={`${process.env.API_IMG_URL}${i?.profile?.avatar?.path}`} />
                <Link
                  href="/profile/[userType]/[slug]"
                  as={`/profile/${UserTypeConvertTooUrl[currUser?.type]}/${i.id}`}
                >
                  <div className="mini-card__text">{i.profile.name}</div>
                </Link>
                <IconButton
                  message
                  icon={speecheIcon}
                  to="/chat/[userType]/[slug]"
                  as={`/chat/${UserTypeToString[i.type]}/${i.id}`}
                />
              </div>
            )
          })}
        </CarouselMulti>
      )}
    </div>
  )
}

export default MiniCardCarousel
