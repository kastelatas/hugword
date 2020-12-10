import React from 'react'
import InlineSVG from 'react-inlinesvg'
// import oops from '../public/icons/ERROR_ILLUSTRATION.svg'
import Button from '@src/components/Button/Button'

const Error = () => {
  return (
    <div className="oops-page">
      {/* <InlineSVG src={oops} /> */}
      <p className="oops-page__text">
        Something went wrong. <br />
        Check your Internet connection or try again later.
      </p>
      <Button className="btn" to="/help" as="/help">
        Сontact support
      </Button>{' '}
      <br />
      <Button className="btn" to="/" as="/">
        Go back to the main page
      </Button>
    </div>
  )
}

export default Error
