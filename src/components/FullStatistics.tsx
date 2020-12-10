import React from 'react'
import InlineSVG from 'react-inlinesvg'
import chatsStartedIcon from '../../public/icons/chats-started.svg'
import viewIcon from '../../public/icons/views-icon.svg'
import billingStatIcon from '../../public/icons/billing-stat.svg'

const FullStatistics = (props) => {
  const { user, title, tooltip, data } = props

  return (
    <div className="full-statistics">
      {title ? <h4 className="profile-statistics__title">Filling out your profile</h4> : ''}

      <div className="profile-statistics__line">
        <InlineSVG src={chatsStartedIcon} />
        <span className="profile-statistics__linetitle">New Chats Started</span>
      </div>
      <div className="bill-table">
        <span className="bill-table__item">Previous week:</span>
        <strong className="bill-table__item-count">{data?.chats?.week}</strong>
        <span className="bill-table__item">Yesterday:</span>
        <strong className="bill-table__item-count bill-table__item-count_low">{data?.chats?.yesterday}</strong>
        <span className="bill-table__item">Tooday::</span>
        <strong className="bill-table__item-count bill-table__item-count_high">{data?.chats?.today}</strong>
      </div>

      <div className="profile-statistics__line">
        <InlineSVG src={viewIcon} />
        <span className="profile-statistics__linetitle">your account Views</span>
        {tooltip ? (
          <i
            className="profile-statistics__tooltip"
            data-tooltip="Available after the first deposit"
          >
            ?
          </i>
        ) : (
          ''
        )}
      </div>
      {user ? (
        ''
      ) : (
        <div className="bill-table">
          <span className="bill-table__item">Previous week:</span>
          <strong className="bill-table__item-count">{data?.messages?.week}</strong>
          <span className="bill-table__item">Yesterday:</span>
          <strong className="bill-table__item-count">{data?.messages?.yesterday}</strong>
          <span className="bill-table__item">Tooday::</span>
          <strong className="bill-table__item-count">{data?.messages?.today}</strong>
        </div>
      )}

      <div className="profile-statistics__line">
        <InlineSVG src={billingStatIcon} />
        <span className="profile-statistics__linetitle">Talkens earned</span>
      </div>
      <div className="bill-table">
        <span className="bill-table__item">Previous week:</span>
        <strong className="bill-table__item-count">{data?.talkens?.week}</strong>
        <span className="bill-table__item">Yesterday:</span>
        <strong className="bill-table__item-count">{data?.talkens?.yesterday}</strong>
        <span className="bill-table__item">Today:</span>
        <strong className="bill-table__item-count">{data?.talkens?.today}</strong>
      </div>
    </div>
  )
}

export default FullStatistics
