import React, { useEffect } from 'react'
import InlineSVG from 'react-inlinesvg'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@src/components/Button/Button'
import { userInit } from '@src/redux/actions/auth'
import billingIcon from '../../../public/icons/main-billing.svg'

const ProfileBilling = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector(({ auth: { user } }) => user)

  return (
    <div className="profile-billing">
      <div className="profile-billing__lines-row">
        <div className="profile-billing__line">
          <InlineSVG src={billingIcon} />
          <span className="profile-billing__message">Your bonus talkens:</span>
          <span className="profile-billing__count">{user.bonuses}</span>
        </div>
        <div className="profile-billing__line">
          <InlineSVG src={billingIcon} />
          <span className="profile-billing__message">Talkens balance:</span>
          <span className="profile-billing__count">{user.talkens}</span>
          <Button to={user?.type === 2 ? '/payment' : '/payment'} success>
            Recharge
          </Button>
        </div>
      </div>
      <div className="profile-billing__row">
        <div className="profile-billing__content">
          <h3 className="profile-billing__subtitle">Lorem ipsum dolor.</h3>
          <p className="profile-billing__text">
            orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
            sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
            ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,
            fringilla vel, aliquet nec, vulputate eget, arcu.
          </p>
        </div>
        <video width="920" controls>
          <source src="https://www.youtube.com/watch?v=oznr-1-poSU" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

export default ProfileBilling
