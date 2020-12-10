import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '@src/redux/actions/modals'
import InlineSVG from 'react-inlinesvg'
import Button from '@src/components/Button/Button'
import Vote from '@src/components/Vote'
import { getReviews, leaveReviews } from '@src/redux/actions/user'
import { getAmbassadorById } from '@src/redux/actions/ambassador'
import { wrapper } from '@src/redux/store'
import letterIcon from '../../../public/icons/main-text.svg'

const FillWithlModalContent = () => {
  const dispatch = useDispatch()
  const ambassador = useSelector(({ ambassador: { ambassador } }) => ambassador)
  const [message, setMessage] = useState('')
  const [valueRating, setvalueRating] = useState('')
  const currUser = useSelector(({ auth: { user } }) => user)
  const comments = currUser?.profile?.comments



  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const viewReating = (value) => {
    setvalueRating(value)
  }

  const updateReviews = () => {
    message && valueRating && dispatch(leaveReviews(ambassador, message, valueRating))
  }

  return (
    <div className="modal-spret ">
      <h3 className="modal__title">
        How do you feel <br />
        about chat with {ambassador.profile?.name}?
      </h3>
      <div className="modal-spret__row">
        <img
          src={ambassador.profile.avatar !== null && `${process.env.API_IMG_URL}${ambassador?.profile?.avatar?.path}`}
          className="modal-spret__img-amba"
          alt=""
        />
        <Vote viewReating={viewReating} />
      </div>
      <div className="input-group">
        <span className="input-group__icon">
          <InlineSVG src={letterIcon} />
        </span>
        <div className="input-group__block">
          <input name="text" type="text" placeholder="Review text..." onChange={(e) => handleChange(e)} />
        </div>
      </div>
      <div className="modal__actions">
        <Button className="btn" onClick={updateReviews} type="button">
          Done
        </Button>
      </div>
    </div>
  )
}

export default FillWithlModalContent
