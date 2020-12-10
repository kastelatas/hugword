import React from 'react'
import CategoryCard from '@src/components/CategoryCard'
import { useSelector } from "react-redux";

const CategoryCardList = () => {
  const topics = useSelector(({ user: { topics } }) => topics)
  return topics.map((i) => <CategoryCard key={i.id} {...i} />)
}

export default CategoryCardList
