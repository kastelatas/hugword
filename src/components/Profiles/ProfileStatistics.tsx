import React, { useEffect } from 'react'
import InlineSVG from 'react-inlinesvg'
import ProgressBar from '@src/components/ProgressBars/ProgressBar'
import ProfileFieldList from '@src/components/Profiles/ProfileFieldsList'
import RadialProgressBar from '@src/components/ProgressBars/RadialProgressBar'
import FullStatistics from '@src/components/FullStatistics'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboardData } from '@src/redux/actions/dashboard'
import chatsStartedIcon from '../../../public/icons/chats-started.svg'
import billingStatIcon from '../../../public/icons/billing-stat.svg'
import viewIcon from '../../../public/icons/views-icon.svg'
import starIcon from '../../../public/icons/star-full.svg'
import achiveIcon from '../../../public/icons/achive-stat-icon.svg'

const profileFields = [
  { label: 'Avatar is set', done: true },
  { label: 'Cover image is set', done: true },
  { label: 'About You is filled', done: false },
  { label: 'One or more photo is uploaded', done: true },
  { label: 'Topics of interests is filled', done: true },
  { label: 'Your email verified', done: false },
  { label: 'Your name filled', done: true },
  { label: 'You stated your gender', done: true },
]

const ProfileStatistics = ({ user = false, tooltip = false }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDashboardData())
  }, [dispatch])

  const stat = useSelector(
    ({
      dashboard: {
        statistics: { stat },
      },
    }) => stat,
  )

  return (
    <div className="profile-statistics">
      <div className="profile-statistics__col">
        <h4 className="profile-statistics__title">Filling out your profile</h4>
        <ProgressBar val={70} />
        <i className="divider" />
        <ProfileFieldList data={profileFields} />
      </div>

      <div className="profile-statistics__col">
        <FullStatistics user={user} tooltip={tooltip} data={stat} />
      </div>
      <div className="profile-statistics__col" />
    </div>
  )
}

export default ProfileStatistics
