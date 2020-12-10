import React, { useState } from 'react'
import InlineSVG from 'react-inlinesvg'
import { useRouter } from 'next/router'
import Button from '@src/components/Button/Button'
import Switch from '@src/components/Button/Switch'
import { editUser, editUserNotification } from '@src/redux/actions/user'
import { UserTypeToString } from '@src/ts/enum/user_enum'
import { useDispatch } from 'react-redux'
import billingIcon from '../../../public/icons/main-billing.svg'
import dotIcon from '../../../public/icons/main-dot.svg'
import letterIcon from '../../../public/icons/main-letter-rassilka.svg'

const ProfileSettings = ({ data, userData }) => {
  const dispatch = useDispatch()

  const [pushState, setPushState] = useState({
    notification_all: data?.notification_all,
    notification_news: data?.notification_news,
    notification_comments: data?.notification_comments,
    notification_achievements: data?.notification_achievements,
    notification_reactions: data?.notification_reactions,
    notification_birthdays: data?.notification_birthdays,
  })

  const handleSwitchChange = (e, name) => {
    setPushState({
      ...pushState,
      [name]: !pushState[name],
    })

  }

  const handleSubmit = () => {
    dispatch(
      editUserNotification(userData?.id, UserTypeToString[userData?.type], pushState),
    )
  }

  const handleCancel = () => {
    setPushState({
      notification_all: data?.notification_all,
      notification_news: data?.notification_news,
      notification_comments: data?.notification_comments,
      notification_achievements: data?.notification_achievements,
      notification_reactions: data?.notification_reactions,
      notification_birthdays: data?.notification_birthdays,
    })
  }

  return (
    <div className="profile-settings">
      <div className="profile-settings__row">
        <div className="profile-settings__grid">
          <div className="switch-container">
            <InlineSVG src={letterIcon} />
            <span className="switch-container__text">Email Notifications</span>
            <Switch />
          </div>
          <div className="switch-container">
            <span className="switch-container__text">Site news</span>
            <Switch />
          </div>
          <div className="switch-container">
            <span className="switch-container__text">New achievement</span>
            <Switch />
          </div>
          <div className="switch-container">
            <span className="switch-container__text">Financial transactions</span>
            <Switch />
          </div>
          <div className="switch-container">
            <span className="switch-container__text">Monthly Analytics</span>
            <Switch />
          </div>
        </div>

        <div className="profile-settings__grid">
          <div className="switch-container">
            <InlineSVG src={dotIcon} />
            <span className="switch-container__text">Push notifications</span>
            <Switch name="notification_all"  value={pushState.notification_all} handleSwitchChange={handleSwitchChange} />
          </div>
          <div className="switch-container">
            <span className="switch-container__text">Site news</span>
            <Switch name="notification_news" value={pushState.notification_news} handleSwitchChange={handleSwitchChange} />
          </div>
          <div className="switch-container">
            <span className="switch-container__text">New comments</span>
            <Switch name="notification_comments" value={pushState.notification_comments} handleSwitchChange={handleSwitchChange} />
          </div>
          <div className="switch-container">
            <span className="switch-container__text">New achievement</span>
            <Switch name="notification_achievements" value={pushState.notification_achievements} handleSwitchChange={handleSwitchChange} />
          </div>
          <div className="switch-container">
            <span className="switch-container__text">New reactions</span>
            <Switch name="notification_reactions" value={pushState.notification_reactions} handleSwitchChange={handleSwitchChange} />
          </div>
          <div className="switch-container">
            <span className="switch-container__text">Users birthdays</span>
            <Switch name="notification_birthdays" value={pushState.notification_birthdays} handleSwitchChange={handleSwitchChange} />
          </div>
        </div>
      </div>
      <div className="profile-settings__action">
        <Button block onClick={handleSubmit}>Save</Button>
        <button className="btn btn_block btn-outline-primary"
                onClick={handleCancel}
                type="button">
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ProfileSettings
