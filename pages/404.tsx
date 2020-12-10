import React from 'react'
import SearchBlock from '@src/components/SearchBlock'
import InlineSVG from 'react-inlinesvg'
import error_svg from '../public/icons/404.svg'

export default function Custom404() {
  return (
    <div className="error-page">
      <div className="error-page__img">
        <InlineSVG src={error_svg} />
      </div>
      <div className="error-page__text">
        <h3 className="error-page__title">page not found :(</h3>
        <p className="error-page__subtitle">Return to home page or use the search</p>
      </div>
      <SearchBlock redirectPath="/" />
    </div>
  )
}
