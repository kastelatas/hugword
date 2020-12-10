import React from 'react'
import PersonCardsList from '@src/components/PersonCardsList'
import NavPanel from '@src/components/NavPanel'
import SearchBlock from '@src/components/SearchBlock'

const PersonsBlock = () => {
  return (
    <section className="persons-block">
      <SearchBlock />
      <NavPanel />
      <PersonCardsList />
    </section>
  )
}

export default PersonsBlock
