
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import SVG from 'react-inlinesvg'
import { closeModal } from '@src/redux/actions/modals'
import warningIcon from '../../../public/icons/warning-icon.svg'

const NeedMoreCashModalContent
  = () => {
  const dispatch = useDispatch()

  return (
    <>
      <h3 className="modal__title">ERROR</h3>
      <p className="modal__text">Message wasn't sent! You dont have anough talkens! </p>
      <div className="modal__icon">
        <SVG src={warningIcon} />
      </div>
      <div className="modal__actions">
        <button className="btn" onClick={() => dispatch(closeModal())} type="button">Ok</button>
      </div>
    </>
  )
}

export default NeedMoreCashModalContent

