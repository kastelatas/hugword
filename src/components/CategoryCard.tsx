import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {searchAmbassadors, setFilter} from '../redux/actions/ambassador'

interface ICategoryCard{
  title: string
  id?: number
  slug: string
  img: any
  label: any
  ambassadorsCount: number
  video?: any
}

const CategoryCard: React.FC<ICategoryCard> = (props) => {
  const dispatch = useDispatch()
  const filterData = useSelector(({ambassador: {filter}}) => filter)
  const {video, id, title, slug, ambassadorsCount} = props

  const handleSearch = () => {
    const obj = {
      ...filterData,
      profile: {
        ...filterData.profile,
        topics: {
          topic: {
            title: title,
          },
        },
      }
    }
    dispatch(setFilter(obj))
    dispatch(searchAmbassadors(obj))
  }

  return (
    <div className="category-card" onClick={handleSearch}>
      <video
        height={186}
        onMouseOver={event => event.target.play()}
        onMouseOut={event => event.target.pause()}
        src={`${process.env.API_IMG_URL}${video?.path}`}
      />
      <div className="category-card__overlay">
        <div className="category-card__title">{title}</div>
        <div className="category-card__text"> Ambassadors: {ambassadorsCount}</div>
      </div>
    </div>
  )
}

export default CategoryCard
