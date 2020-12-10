import React from 'react'
import classNames from 'classnames'
import Button from '@src/components/Button/Button'
import Link from 'next/link'
import Vote from '@src/components/Vote'
import { useSelector } from 'react-redux'
import { UserTypeConvertTooUrl } from '@src/ts/enum/user_enum'
import bubbleIcon from '../../public/icons/speech-bubble.svg'
import { TagsList } from './Tags'
import {searchAmbassadors, setFilter} from "@src/redux/actions/ambassador";

interface IPersonCard {
  id: any
  profile: any
  statusTitle: any
}

const PersonCard: React.FC<IPersonCard> = (props) => {
  const { id, profile, state, statusTitle } = props
  const currUser = useSelector(({ auth: { user } }) => user)

  // console.log(profile)

  const status = classNames('person-card__status', {
    'person-card__status_success': state?.online,
  })



  return (
    <div className="person-card">
      <Link href="/profile/[userType]/[slug]" as={`/profile/${UserTypeConvertTooUrl[currUser?.type]}/${id}`}>
        <a className="person-card__header">
          <img className="person-card__img" src={`${process.env.API_IMG_URL}/274x280/${profile?.avatar?.path}`} alt="avatar" />
          <div className="person-card__stars-container">
            <Vote placeholderRating={profile?.rating?.rating} readonly />
            <span className="person-card__stars-counter">({profile?.rating?.count || '0'})</span>
          </div>
        </a>
      </Link>
      <div className="person-card__content">
        <div className="person-card__row">
          <span className="person-card__name">{profile?.name}</span>
          <span className={status}>{state?.online ? 'Online' : 'Offline'}</span>
        </div>
        <div className="person-card__tags-block">
          <span className="person-card__tags-block-title">Topics of conversation</span>
          <TagsList topics={profile?.topics} />
        </div>
        {currUser && <Button
          icon={bubbleIcon}
          to="/chat/[userType]/[slug]"
          as={`chat/${UserTypeConvertTooUrl[currUser?.type]}/${id}`}
        >
          Start chat
        </Button>}
      </div>
    </div>
  )
}

export default PersonCard
