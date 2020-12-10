import React from 'react'
import InlineSVG from 'react-inlinesvg'
import Footer from '@src/components/Footer'
import { wrapper } from '@src/redux/store'
import { getAbout } from '@src/redux/actions/about'

import { useSelector } from 'react-redux'
import chatsStartedIcon from '../public/icons/chats-started.svg'

const About = () => {
  const about = useSelector(({ about: { aboutData } }) => aboutData)
  return (
    <div className="about-page">
      <h1 className="about-page__title">{about?.top_title}</h1>
      <p className="about-page__subtitle">{about?.top_description}</p>

      <div className="about-page__row-cont">
        <div className="about-page__img-row">
          {Boolean(about?.photos) &&
          about?.photos.map((i, inx) => (
              <div key={inx} className="about-page__img-block">
                <img className="about-page__img" src={`${process.env.API_IMG_URL}${i?.image.path}`} alt="about_img" />
              </div>
          ))}
        </div>
      </div>

      <div className="statistics">
        <div className="about-page__row">
          <div className="statistics-block">
            <InlineSVG src={chatsStartedIcon} />
            <span className="counter">20,000</span>
            <span className="statistic-title">Chats online</span>
          </div>

          <div className="statistics-block">
            <InlineSVG src={chatsStartedIcon} />
            <span className="counter">20,000</span>
            <span className="statistic-title">Chats online</span>
          </div>

          <div className="statistics-block">
            <InlineSVG src={chatsStartedIcon} />
            <span className="counter">20,000</span>
            <span className="statistic-title">Chats online</span>
          </div>

          <div className="statistics-block">
            <InlineSVG src={chatsStartedIcon} />
            <span className="counter">20,000</span>
            <span className="statistic-title">Chats online</span>
          </div>
        </div>
      </div>

      <div className="about-page__descr">
        <div className="about-page__row">
          <div className="about-page__col">
            <p className="about-page__descr_subtitle">{about?.center_note}</p>
            <h2 className="about-page__descr_title">{about?.center_title}</h2>
            <p className="about-page__descr_text">{about?.center_description}</p>
          </div>
          <div className="about-page__col">
            <div className="about-page__imgs">
              <img
                className="about-page__big"
                src={`${process.env.API_IMG_URL}${about?.photo1?.path}`}
                alt="about_img"
              />
              <img
                className="about-page__small"
                src={`${process.env.API_IMG_URL}${about?.photo2?.path}`}
                alt="about_img"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="about-page__team">
        <p className="about-page__team_subtitle">{about?.bottom_note}</p>
        <h2 className="about-page__team_title">{about?.bottom_title}</h2>
        <p className="about-page__team_text">{about?.bottom_description}</p>

        <div className="about-page__img-row">
          {Boolean(about?.photos) &&
            about?.photos.map((i, inx) => (
                <div key={inx} className="about-page__img-block">
                  <img className="about-page__img" src={`${process.env.API_IMG_URL}${i?.image.path}`} alt="about_img" />
                </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export const getServerSideProps = wrapper.getStaticProps(async ({ store }) => {
  await store.dispatch(getAbout())
})

export default About
