import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@src/components/Button/Button'
import { useRouter } from 'next/router'
import HelpForm from '../src/components/forms/HelpForm'

const HelpPage = () => {
  const [showForm, setShowForm] = useState(false)
  const [showGreatText, setShowGreatText] = useState(false)
  const [showText, setShowText] = useState(true)
  const router = useRouter()

  const handleOpenForm = () => {
    setShowForm(!showForm)
    setShowText(!showText)
  }

  const handleOpenGreatText = () => {
    setShowGreatText(!showGreatText)
    setShowText(!showText)
  }

  return (
    <div className="help-page">
      <div className="help-page__content">
        <h1 className="help-page__title">Help Center</h1>
        {showText ? (
          <div>
            <p className="help-page__text">Welcome you to HugWord support service.</p>
            <br />
            <p className="help-page__text">
              We will do our best to help you to solve your problem. We suggest you to read the <a href="/faq">FAQ</a> page first, which
              contains answers to the most frequently asked questions of our users. If you do not find the answer to
              your question there, you can create a ticket and our experts will try to help you.
            </p>
            <br />
            <p className="help-page__text"> Did <a href="/faq">FAQ</a> page solve your problem?</p>
            <div className="help-page__button-block">
              <button className="btn btn_block btn-outline-primary" type="button" onClick={handleOpenForm}>
                No
              </button>
              <button className="btn btn_block" type="button" onClick={handleOpenGreatText}>
                Yes
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
        {showForm ? (
          <div>
            <h2 className="help-page__sub-title">
              Describe the problem and our support team will help you to solve it.
            </h2>
            <HelpForm />
          </div>
        ) : (
          ''
        )}

        {showGreatText ? (
          <div>
            <p className="help-page__text"> Great!</p>
            <br />
            <p className="help-page__text">
              We are glad that your problem is solved. We hope that HugWord service will continue to bring you pleasure.
            </p>
            <br />
            <p className="help-page__text">Have a good day!</p>
            <br/>
            <button className="btn btn_block help-page__btn-great" type="button" onClick={() => router.push('/')}>
              Back to Hug Search
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default HelpPage
