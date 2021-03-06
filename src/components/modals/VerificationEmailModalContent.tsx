import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InlineSVG from 'react-inlinesvg'
import Button from '@src/components/Button/Button'
import { verifyEmail } from '@src/redux/actions/auth'
import letterIcon from '../../../public/icons/main-letter.svg'

const VerificationEmailModalContent = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const errors = useSelector(({ auth: { errorMessage } }) => errorMessage)

  const handleInputValue = (e) => setValue( e.target.value)
  return (
    <div className="modal-spret">
      <h3 className="modal__title">Verification</h3>
      <p className="modal__text">
        To continue to communicate you need to get verified. <br />
        Please enter your e-mail address.
      </p>
      <div className="input-group">
        <span className="input-group__icon">
          <InlineSVG src={letterIcon} />
        </span>
        <div className="input-group__block">
          <input
            value={value}
            name="email" type="email"
            placeholder="Enter your e-mail"
            onChange={handleInputValue}
          />
          {Boolean(errors.email?.length) &&
          errors.email.map((i) => <div className="input-group__invalid">{i}</div>)}
        </div>
      </div>
      <div className="modal__actions">
        <Button onClick={() => dispatch(verifyEmail(value))}>Ok</Button>
      </div>
    </div>
  )
}

export default VerificationEmailModalContent
