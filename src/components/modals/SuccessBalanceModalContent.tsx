import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import SVG from 'react-inlinesvg'
import { closeModal } from '@src/redux/actions/modals'
import * as FormControl from '@src/components/Form'
import InlineSVG from 'react-inlinesvg'

const SuccessBalanceModalContent = () => {
  const dispatch = useDispatch()

  return (
    <div className="modal-spret">
      <h3 className="modal__title">Success</h3>
      <p className="modal__text">
        You have successfully funded your balance. <br />
        Thank you for choosing HugWord!
      </p>
      <div className="input-group">
        <span className="input-group__icon review-thank succes-balance__row">
          <InlineSVG src="/icons/main-billing.svg" />{' '}
         {/* <p>
            <span>+ 100</span> talkings
          </p>*/}
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

export default SuccessBalanceModalContent
