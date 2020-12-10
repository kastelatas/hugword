import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import SVG from 'react-inlinesvg'
import { closeModal } from '@src/redux/actions/modals'
import * as FormControl from '@src/components/Form'
import InlineSVG from 'react-inlinesvg'

const ThankYouReviewModalContent = () => {
  const dispatch = useDispatch()

  return (
    <div className="modal-spret">
      <h3 className="modal__title">Thank You!</h3>
      <p className="modal__text">
        Your Review has been sent to moderation. <br />
        Thank you for helping to make HugWord better!
      </p>
      <div className="input-group">
        <span className="input-group__icon review-thank">
          <InlineSVG src="/icons/main-check-green.svg" />
        </span>
      </div>
      <div className="modal__actions">
        <button className="btn" onClick={() => dispatch(closeModal())} type="button">
          Ok
        </button>
      </div>
    </div>
  )
}

export default ThankYouReviewModalContent
