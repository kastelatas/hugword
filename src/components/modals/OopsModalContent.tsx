import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import SVG from 'react-inlinesvg'
import { closeModal } from '@src/redux/actions/modals'
import * as FormControl from '@src/components/Form'
import InlineSVG from 'react-inlinesvg'

const OopsModalContent = () => {
  const dispatch = useDispatch()

  return (
    <div className="modal-spret">
      <h3 className="modal__title">OOPS!</h3>
      <p className="modal__text">
        Something went wrong. <br />
        Please wait or try again.
      </p>
      <div className="input-group">
        <span className="input-group__icon review-thank">
          <InlineSVG src="/icons/main-dot.svg" />
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

export default OopsModalContent