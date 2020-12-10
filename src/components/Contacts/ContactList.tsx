import React from 'react'
import Contact from './Contact'

const ContactList = ({ contactsList, isNotFavorite }) => {
  return (
    <div className="contacts-group">
      {contactsList && contactsList?.map((i) => (
        <Contact isNotFavorite={isNotFavorite} key={i?.user?.id} id={i?.user?.id} {...i} />
      ))}
    </div>
  )
}

export default ContactList
