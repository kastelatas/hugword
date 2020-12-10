import React from 'react'
import { convertFromTimeStampToDateWithoutTime } from '@src/utils/DateTimeHelper'
import Vote from '@src/components/Vote'
import Ava from '@src/components/Ava'
import ProfileDegree from '@src/components/ProfivelDegree'

const Comment = (props: { client: any; message: any; created_at: any; ava?: boolean; rating: number }) => {
  const { client, message, rating, created_at, ava, isReviews } = props

  const trimMessage = message.length > 60 ? message.substring(0, 60).concat('...') : message
  // console.log(isReviews)

  return (
    <div className="comment">
      <div className="comment__header">
        <Ava sm img={`${process.env.API_IMG_URL}${client?.profile?.avatar?.path}`}>
          {/* {ava ? <ProfileDegree /> : null} */}
        </Ava>
        <div className="comment__wrapper">
          <div className="comment__title">
            <div className="comment__name">{client?.profile?.name}</div>
            <div className="comment__date">{convertFromTimeStampToDateWithoutTime(created_at)}</div>
          </div>
          <Vote placeholderRating={rating} readonly />
          {/*{ava && <i className="comment__atantion">!</i>}*/}
        </div>
        <div className="comment__title" />
      </div>
      <div className="comment__text">{isReviews ? message : trimMessage}</div>
    </div>
  )
}

export default Comment
