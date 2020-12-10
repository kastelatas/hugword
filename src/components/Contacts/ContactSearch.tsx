import React from 'react'
import IconButton from '@src/components/Button/IconButton'
import plusIcon from '../../../public/icons/plus-grey.svg'

const SearchContainer = ({ handleChange, value }) => {
  return (
    <div className="input-group input-group_accent">
      <input type="text" value={value} placeholder="Search" onChange={handleChange} />
      <span className="input-group__append">
        <IconButton add icon={plusIcon} to="/" as="/" />
      </span>
    </div>
  )
}

export default SearchContainer
