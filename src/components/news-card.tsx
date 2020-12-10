import React from 'react'
import SVG from 'react-inlinesvg'
import Button from '@src/components/Button/Button'
import { convertFromTimeStampToDateWithoutTime } from '@src/utils/DateTimeHelper'

const NewsCard = (props) => {
  const { id, title, description, published_at, preview } = props

  return (
    <div className="news-card">
      <div className="news-card__img">
        <img src={`${process.env.API_IMG_URL}${preview?.path}`} alt="news_img" />
      </div>

      <h2 className="news-card__title">{title}</h2>
      <div className="news-card__date">{convertFromTimeStampToDateWithoutTime(published_at)}</div>

      <p className="news-card__text">{description}</p>
      <div className="news-card__action">
        <Button to="/news/[id]" as={`/news/${id}`}>
          Read more
        </Button>
      </div>
    </div>
  )
}

export default NewsCard
