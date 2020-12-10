import React, { useState } from 'react'
import Button from '@src/components/Button/Button'
import arrowDownIcon from '../../public/icons/arrow-down.svg'
import arrowUpIcon from '../../public/icons/arrow-up.svg'

const Sorting = ({ handleSorting, type }) => {

  const [state, setState] = useState(false)

 const handleTogle = () => {
   setState(!state)
    handleSorting(state ? `sort=-${type}` : `sort=${type}`)
  }

  return (
    <div className="sorting" onClick={ handleSorting && handleTogle}>
      <span className="sorting__text">Sort by:</span>
      <span className="sorting__list">{type}</span>
      <Button icon={!state ? arrowDownIcon : arrowUpIcon} />
    </div>
  )
}

export default Sorting
