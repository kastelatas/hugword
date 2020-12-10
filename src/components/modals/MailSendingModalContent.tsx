import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import SVG from 'react-inlinesvg'
import { closeModal } from '@src/redux/actions/modals'

const MailSendingModalContent = () => {
  const dispatch = useDispatch()

  return (
    <>
      <h3 className="modal__title">MESSAGE SANDED</h3>
      <p className="modal__text">Check your email for massage and press link for continues</p>
      <div className="modal__icon">
        <SVG src="/icons/main-dot.svg" />
      </div>
      <div className="modal__actions">
        <button className="btn" onClick={() => dispatch(closeModal())} type="button">Ok</button>
      </div>
    </>
  )
}

export default MailSendingModalContent
