import React, { useState } from 'react'
import Switch from '@src/components/Button/Switch'
import InlineSVG from 'react-inlinesvg'
import { useRouter } from 'next/router'
import * as FormControl from '@src/components/Form'
import IconButton from '@src/components/Button/IconButton'
import Button from '@src/components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { searchAmbassadors } from '@src/redux/actions/ambassador'
import EditableTextArea from '@src/components/Form/TextArea'
import Radio from '@src/components/Radio'
import closeIcon from '../public/icons/close.svg'
import dotIcon from '../public/icons/main-dot.svg'
import letterIcon from '../public/icons/main-letter-rassilka.svg'
import nameIcon from '../public/icons/Name.svg'
import genderIcon from '../public/icons/Gender.svg'
import passIcon from '../public/icons/main-pass.svg'
import {editUser} from "@src/redux/actions/user"
import {UserTypeToString} from "@src/ts/enum/user_enum";

const SettingsPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector(({ auth: { user } }) => user)
  const goBack = () => router.back()

  const [inputValue, setInputValue] = useState({
    password: '',
    confirmPassword: '',
  })

  const placeholderConfirmPassword = 'Enter new password'
  const placeholderPassword = 'Enter new password'

  const handleSearchSubmit = (inputValue) => {
    dispatch(searchAmbassadors(inputValue))
  }

  const handleAction = (userId, value) => {
    return editUser(userId, UserTypeToString[user.type], { name: `${value}` })
  }

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleSwitchChange = (e) => {
    console.log('----------------e----------------', e.target.checked)
  }

  return (
    <div className="settings-page">
      <IconButton close icon={closeIcon} onClick={goBack} />

      <div className="settings-page__row">
        <div className="settings-page__col">
          <h3 className="settings-page__title">Profile settings</h3>
          <div className="settings-page__line">
            <InlineSVG src={nameIcon} />
            <span className="settings-page__linetitle">Your name:</span>
            <EditableTextArea user={user} rows={1} textBold textValue={user?.profile?.name} handleAction={handleAction} />
          </div>
          <div className="settings-page__line">
            <InlineSVG src={genderIcon} />
            <span className="settings-page__linetitle">Your gender:</span>
            <form className="radio-form">
              <Radio labelText="Male" isChecked />
              <Radio labelText="Female" />
            </form>
          </div>
          <div className="settings-page__line">
            <InlineSVG src={letterIcon} />
            <span className="settings-page__linetitle">Your email:</span>
            <EditableTextArea rows={1} textBold textValue={user?.email} />
          </div>
          <div className="settings-page__line">
            <InlineSVG src={passIcon} />
            <span  className="settings-page__linetitle">Change password</span>
          </div>
          <form action="" className="settings-page__form">
            <FormControl.FormControl>
              <FormControl.Input
                handleChange={handleChange}
                value={inputValue.password}
                name="password"
                type="password"
                placeholder={placeholderPassword}
              />
            </FormControl.FormControl>
            <FormControl.FormControl>
              <FormControl.Input
                handleChange={handleChange}
                value={inputValue.confirmPassword}
                name="confirmPassword"
                type="password"
                placeholder={placeholderConfirmPassword}
              />
            </FormControl.FormControl>
            <div className="settings-page__action">
              <button className="btn btn_block btn-outline-primary" type="button">
                Cancel
              </button>
              <Button block disabled={!inputValue.password || !inputValue.confirmPassword}>
                Save
              </Button>
            </div>
          </form>
        </div>

        <div className="settings-page__col">
          <h3 className="settings-page__title">Notifications settings</h3>
          <div className="settings-page__grid">
            <div className="switch-container">
              <InlineSVG src={dotIcon} />
              <span className="switch-container__text">Email Notifications</span>
              <Switch cheked handleSwitchChange={handleSwitchChange} />
            </div>
            <div className="switch-container">
              <span className="switch-container__text">New achievement</span>
              <Switch cheked handleSwitchChange={handleSwitchChange} />
            </div>
            <div className="switch-container">
              <span className="switch-container__text">Financial transactions</span>
              <Switch cheked handleSwitchChange={handleSwitchChange} />
            </div>
            <div className="switch-container">
              <span className="switch-container__text">Monthly Analytics</span>
              <Switch cheked handleSwitchChange={handleSwitchChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
