import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import SVG from 'react-inlinesvg'
import { closeModal } from '@src/redux/actions/modals'

const SuccessChangedModalContent = () => {
  const dispatch = useDispatch()

  return (
    <>
      <h3 className="modal__title">SUCCESS</h3>
      <p className="modal__text">You confirm was success</p>
      <div className="modal__icon">
        <SVG src="/icons/main-dot.svg" />
      </div>
      <div className="modal__actions">
        <button className="btn" onClick={() => dispatch(closeModal())} type="button">Thanks</button>
      </div>
    </>
  )
}

export default SuccessChangedModalContent
