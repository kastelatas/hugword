import React, { useState } from 'react'
import InlineSVG from 'react-inlinesvg'
import { useRouter } from 'next/router'
import IconButton from '@src/components/Button/IconButton'
import Button from '@src/components/Button/Button'
import { useDispatch } from 'react-redux'
import { searchAmbassadors } from '@src/redux/actions/ambassador'
import closeIcon from '../public/icons/close.svg'
import billingIcon from '../public/icons/main-billing.svg'

const BillingPage = () => {
  const router = useRouter()
  const goBack = () => router.back()

  return (
    <div className="billing-page">
      <IconButton close icon={closeIcon} onClick={goBack} />
      <h2 className="billing-page__title">Billing</h2>
      <div className="billing-page__line">
        <InlineSVG src={billingIcon} />
        <span className="billing-page__message">Talkens balance:</span>
        <span className="billing-page__count">{1385}</span>
        <Button success>Recharge</Button>
      </div>
      <div className="billing-page__row">
        <div className="billing-page__content">
          <h3 className="billing-page__subtitle">Lorem ipsum dolor.</h3>
          <p className="billing-page__text">
            orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
            sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
            Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
          </p>
        </div>
        <video width="920" controls  >
          <source src="https://www.youtube.com/watch?v=oznr-1-poSU" type="video/mp4"/>
        </video>
      </div>
    </div>
  )
}

export default BillingPage
