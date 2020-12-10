import React from 'react'

import ProfileField from '@src/components/Profiles/ProfileField'

const ProfileFieldList = ({ data }) => {
  return data.map((i, idx) => <ProfileField key={idx} {...i} />)
}

export default ProfileFieldList
