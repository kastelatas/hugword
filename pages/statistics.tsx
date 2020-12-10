import React from 'react'
import InlineSVG from 'react-inlinesvg'
import { useRouter } from 'next/router'
import IconButton from '@src/components/Button/IconButton'
import Button from '@src/components/Button/Button'
import Counter from '@src/components/counter'
import closeIcon from '../public/icons/close.svg'
import billingStatIcon from '../public/icons/billing-stat.svg'
import billingIcon from '../public/icons/main-billing.svg'
import chatsStartedIcon from '../public/icons/chats-started.svg'
import talkEarnedIcon from '../public/icons/talk-earned.svg'

const SettingsPage = () => {
  const router = useRouter()
  const goBack = () => router.back()

  return (
    <div className="statistics-page">
      <IconButton close icon={closeIcon} onClick={goBack} />
      <div className="statistics-page__row">
        <div className="statistics-page__col">
          <h3 className="statistics-page__title">Your statistics</h3>

          <div className="statistics-page__line">
            <InlineSVG src={chatsStartedIcon} />
            <span className="settings-page__linetitle">New Chats Started</span>
          </div>
          <div className="bill-table">
            <span className="bill-table__item">Previous week:</span>
            <strong className="bill-table__item-count">122</strong>
            <span className="bill-table__item">Yesterday:</span>
            <strong className="bill-table__item-count bill-table__item-count_low">122</strong>
            <span className="bill-table__item">Tooday::</span>
            <strong className="bill-table__item-count bill-table__item-count_high">122</strong>
          </div>

          <div className="statistics-page__line">
            <InlineSVG src={chatsStartedIcon} />
            <span className="settings-page__linetitle">Incoming Messages</span>
          </div>
          <div className="bill-table">
            <span className="bill-table__item">Previous week:</span>
            <strong className="bill-table__item-count">122</strong>
            <span className="bill-table__item">Yesterday:</span>
            <strong className="bill-table__item-count">122</strong>
            <span className="bill-table__item">Tooday::</span>
            <strong className="bill-table__item-count">122</strong>
          </div>

          <div className="statistics-page__line">
            <InlineSVG src={billingStatIcon} />
            <span className="statistics-page__linetitle">Talkens earned</span>
          </div>
          <div className="bill-table">
            <span className="bill-table__item">Previous week:</span>
            <strong className="bill-table__item-count">22</strong>
            <span className="bill-table__item">Yesterday:</span>
            <strong className="bill-table__item-count">12</strong>
            <span className="bill-table__item">Tooday::</span>
            <strong className="bill-table__item-count">122</strong>
          </div>
        </div>

        <div className="statistics-page__col">
          <h3 className="statistics-page__title">Billing</h3>
          <div className="statistics-page__grid">
            <div className="billing-page__line">
              <InlineSVG src={billingIcon} />
              <span className="statistics-page__message">Talkens balance:</span>
              <span className="statistics-page__count">{1385}</span>
              <Button>Withdraw</Button>
            </div>
            <h3 className="statistics-page__title">Incomming talcins dinamics</h3>
            <div className="billing-page__line">
              <InlineSVG src={talkEarnedIcon} />
              <span className="statistics-page__line-text">Price settings</span>
              <span className="statistics-page__line-text-light">(talkens per message)</span>
              <Counter />
              <div className="helper">?</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
