import React, { useEffect, useState } from 'react'
import InlineSVG from 'react-inlinesvg'
import * as FormControl from '@src/components/Form'
import Button from '@src/components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { searchAmbassadors } from '@src/redux/actions/ambassador'
import EditableTextArea from '@src/components/Form/TextArea'
import EditableInput from '@src/components/Form/EditableInput'
import Radio from '@src/components/Radio'
import { editUser, editUserEmail, settUserPassword } from '@src/redux/actions/user'
import { UserTypeToString } from '@src/ts/enum/user_enum'
import { ModalsType } from '@src/ts/enum/modal_enum'
import letterIcon from '../../../public/icons/main-letter-rassilka.svg'
import nameIcon from '../../../public/icons/Name.svg'
import genderIcon from '../../../public/icons/Gender.svg'
import passIcon from '../../../public/icons/main-pass.svg'

const radioData = [
  { id: 1, label: 'Male', value: 1, name: 'gender' },
  { id: 2, label: 'Female', value: 2, name: 'gender' },
  { id: 3, label: 'Unset', value: 0, name: 'gender' },
]

const ProfilePersonals = () => {
  const dispatch = useDispatch()

  const user = useSelector(({ auth: { user } }) => user)

  const updateLoading = useSelector(({ user: { updateLoading } }) => updateLoading)

  const passwordChangeErrors = useSelector(({ user: { passwordChangeErrors } }) => passwordChangeErrors)

  const placeholderConfirmPassword = 'Confirm new password'

  const placeholderNewPassword = 'Enter new password'

  const placeholderPassword = 'Enter the existing password'

  const [genderValue, setGenderValue] = useState(radioData)

  const [userName, setUserName] = useState(user?.profile?.name)

  const [email, setEmail] = useState(user?.email)

  const [inputValue, setInputValue] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
    error: null,
  })

  const handleSearchSubmit = (inputValue) => dispatch(searchAmbassadors(inputValue))

  const handleUserNameChange = (userId, value) => editUser(userId, UserTypeToString[user?.type], { name: `${value}` })

  const handleUserEmailChange = (userId, value) => editUserEmail(value)

  const confirmedPassword = inputValue.newPassword === inputValue.confirmPassword

  const handleChange = (e) =>
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    })

  const handleGenderValueChange = (event) =>
    dispatch(editUser(user?.id, UserTypeToString[user.type], { gender: `${event.target.value}` }))

  const radioList = () => {
    return radioData.map((item) => {
      return(<Radio
          key={item.id}
          {...item}
          defaultCheck={user?.profile?.gender}
          handleGenderValueChange={handleGenderValueChange}
        />)
    })
  }

  const handleSave = () => {
    dispatch(settUserPassword(inputValue.password, inputValue.newPassword))
  }

  const handleCancel = () => {
    setInputValue({
      password: '',
      newPassword: '',
      confirmPassword: '',
      error: null,
    })
  }

  return (
    <div className="profile-personals">
      <div className="profile-personals__row">
        <div className="profile-personals__col">
          <div className="profile-personals__line">
            <InlineSVG src={nameIcon} />
            <span className="profile-personals__linetitle">Your name:</span>
            <EditableInput
              user={user}
              name="userName"
              type="text"
              pattern=".{3,}"
              errorText="Name should be long then 3 charts"
              textBold
              textValue={user?.profile?.name}
              handleAction={handleUserNameChange}
            />
          </div>
          <div className="profile-personals__line">
            <InlineSVG src={genderIcon} />
            <span className="profile-personals__linetitle">Your gender:</span>
            <form className="radio-form">{ radioList()}</form>
          </div>
          <div className="profile-personals__line">
            <InlineSVG src={letterIcon} />
            <span className="profile-personals__linetitle">Your email:</span>
            <EditableInput
              type="email"
              errorText="Not valid email"
              textBold
              textValue={user?.email}
              handleAction={handleUserEmailChange}
            />
          </div>
        </div>

        <div className="profile-personals__col">
          <div className="profile-personals__line">
            <InlineSVG src={passIcon} />
            <span className="profile-personals__linetitle">Change password</span>
          </div>
          <form action="" className="profile-personals__form">
            <FormControl.FormControl>
              <div className="input-group__block">
                <FormControl.Input
                  handleChange={handleChange}
                  value={inputValue.password}
                  name="password"
                  type="password"
                  placeholder={placeholderPassword}
                />
                {passwordChangeErrors?.old_password &&
                  passwordChangeErrors?.old_password.map((i) => <div className="input-group__invalid">{i}</div>)}
              </div>
            </FormControl.FormControl>
            <FormControl.FormControl>
              <div className="input-group__block">
                <FormControl.Input
                  handleChange={handleChange}
                  value={inputValue.newPassword}
                  name="newPassword"
                  type="password"
                  placeholder={placeholderNewPassword}
                />
                {inputValue.newPassword && inputValue.newPassword.length < 8 && (
                  <div className="input-group__invalid">Should be last 8 charges</div>
                )}
                {(inputValue.password && inputValue.newPassword ) && (inputValue.password === inputValue.newPassword) && (
                  <div className="input-group__invalid">Should be different then previous password</div>
                )}
              </div>
            </FormControl.FormControl>
            <FormControl.FormControl>
              <div className="input-group__block">
                <FormControl.Input
                  handleChange={handleChange}
                  value={inputValue.confirmPassword}
                  name="confirmPassword"
                  type="password"
                  placeholder={placeholderConfirmPassword}
                />
                {inputValue.newPassword && !confirmedPassword && (
                  <div className="input-group__invalid">Not correct</div>
                )}
                {(inputValue.password && inputValue.newPassword ) && (inputValue.password === inputValue.newPassword) && (
                  <div className="input-group__invalid">Should be different then previous password</div>
                )}
              </div>
            </FormControl.FormControl>
            <div className="profile-personals__action">
              <button className="btn btn_block btn-outline-primary" type="button" onClick={handleCancel}>
                Cancel
              </button>
              <Button
                block
                disabled={
                  !inputValue.password || !inputValue.confirmPassword || !inputValue.newPassword || !confirmedPassword
                }
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfilePersonals
