import React, { useRef, useState } from 'react'
import classNames from "classnames";

const ProfileField = ({label, done}) => {
const root = classNames('profile-field', {
  'profile-field_done': done
})

  return (
    <div className={root}>
      <div className="profile-field__text">{label}</div>
    </div>
  )
}

export default ProfileField
