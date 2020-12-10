import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ContactSearch from '@src/components/Contacts/ContactSearch'
import TabsContainer from '@src/Containers/TabsContainer'
import { ContactList } from '@src/components/Contacts'

const ContactsContainer = () => {
  const contactsList = useSelector(({ chat: { contacts } }) => contacts)
  const favoriteContactsList = useSelector(({ chat: { favoritesContacts } }) => favoritesContacts)
  const [value, setValue] = useState('')

  const [itemsTab, setItemsTab] = useState([
    { id: 1, label: 'all contacts', active: true },
    { id: 2, label: 'favourite', active: false },
  ])

  const handleTabChange = (e, id) => {
    const newMap = itemsTab.map((i) => (i.id === id ? ( {...i, active: true} ) : ({...i, active: false})))
    setItemsTab([...newMap])
  }

  const handleChange = (e) => setValue(e.target.value)
  const isNotFavorite = itemsTab.find(i => i.id ).active
  const cl = isNotFavorite ? contactsList : favoriteContactsList

  const filteredList = value
    ? cl && cl.filter((i) => i.user.name.toLowerCase().includes(value.toLowerCase()))
    : cl

  return (
    <div>
      <ContactSearch handleChange={handleChange} />
      <TabsContainer options={itemsTab} handleTabChange={handleTabChange} />
      <ContactList isNotFavorite={isNotFavorite} contactsList={filteredList} />
    </div>
  )
}

export default ContactsContainer
