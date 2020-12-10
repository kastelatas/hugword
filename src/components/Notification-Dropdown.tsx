import React from 'react'
import { convertFromTimeStampToDate } from '@src/utils/DateTimeHelper'

const NotificationDropdown = ({ notifications, dropdownMenuRef }) => {
  return (
    <div className="notification-dropdown" ref={dropdownMenuRef}>
      <div className="notification-dropdown__header">
        <span>Notifications</span>
        {Boolean(notifications?.length) && (
          <a href="" className="link">
            Mark all as read
          </a>
        )}
      </div>
      <ul className="notification-dropdown__content">
        {Boolean(notifications?.length) ?
          notifications.map((i) => {
            const userData = i?.notification?.client || i?.notification?.ambassador
            return (
              <li className="notification-dropdown__item" key={i.id}>
                <div className="ava ava_xs">
                  <img className="ava__img" src={`${process.env.API_IMG_URL}${userData?.avatar}`} alt="img" />
                </div>
                <div className="notification-dropdown__item-content">
                  <span className="notification-dropdown__item-text">
                    <span className="notification-dropdown__item-title">{userData?.name}</span> {i.message}
                  </span>
                  <div className="notification-dropdown__item-date">{convertFromTimeStampToDate(i?.created_at)}</div>
                </div>
              </li>
            )
          })
            : <div className="empty-state">No Notifications</div>
        }
      </ul>
      <div className="notification-dropdown__footer">
        {Boolean(notifications?.length) && (
          <a href="" className="link">
            View All
          </a>
        )}
      </div>
    </div>
  )
}

export default NotificationDropdown
