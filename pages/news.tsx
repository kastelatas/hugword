import React from 'react'
import { wrapper } from '@src/redux/store'
import { getNews } from '@src/redux/actions/news'
import NewsCard from '../src/components/news-card'
import { useSelector } from "react-redux";

const News = () => {

  const newsList = useSelector(({news: {newsList}} ) => newsList)

  return (
    <div className="news-page">
      <h1 className="news-page__title">Our News</h1>
      <div className="news-page__content">
        { newsList.map( i => <NewsCard key={i.id} {...i} />)}
      </div>
    </div>
  )
}

export const getServerSideProps = wrapper.getStaticProps(async ({ store }) => {
  await store.dispatch(getNews())
})

export default News
