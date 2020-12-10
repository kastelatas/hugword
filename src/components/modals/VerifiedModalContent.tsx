import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import SVG from 'react-inlinesvg'
import { closeModal } from '@src/redux/actions/modals'
import InlineSVG from "react-inlinesvg";

const VerifiedModalContent = () => {
  const dispatch = useDispatch()

  return (
    <>
      <h3 className="modal__title">Now you are Verified</h3>
      <p className="modal__text">You received a gift of 10 talkings as a thank you!
        You can spend them for chating (1 talking = 1 massage).</p>
      <div className="input-group">
            <span className="input-group__icon review-thank">
              <InlineSVG src="/icons/main-check-green.svg"/>
            </span>
      </div>
      <div className="modal__actions">
        <button className="btn" onClick={() => dispatch(closeModal())} type="button">Thanks</button>
      </div>
    </>
  )
}

export default VerifiedModalContent
