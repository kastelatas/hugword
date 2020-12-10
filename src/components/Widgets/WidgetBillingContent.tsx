import InlineSVG from 'react-inlinesvg'
import Button from '@src/components/Button/Button'
import React from 'react'
import billingIcon from '../../../public/icons/main-billing.svg'

const WidgetBillingContent = ({ data }) => {
  return (
    <div className="widget widget-billing">
      <div className="widget__row">
        <div className="widget__col">
          <InlineSVG src={billingIcon} />
          <span className="widget__points">
            Talkens balance: <span>{data?.talkens}</span>{' '}
          </span>
        </div>
      </div>
      <div className="widget__row">
        <div className="widget__col">
          <InlineSVG src={billingIcon} />
          <span className="widget__points">
            Bonus talkens:<span> {data?.bonuses} </span>{' '}
          </span>
        </div>
      </div>
      <Button>Withdraw</Button>
    </div>
  )
}

export default WidgetBillingContent
