import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Button from '@src/components/Button/Button'
import AutosuggestInput from '@src/components/AutosuggestInput'
import * as FormControl from '@src/components/Form'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import InlineSVG from 'react-inlinesvg'
import searchIcon from '../../public/icons/search.svg'
import {cleanFilter, getAmbassadoresList, searchAmbassadors, setFilter} from '../redux/actions/ambassador'

const SearchBlock = ({ redirectPath }) => {
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  const user = useSelector(({ auth: { user } }) => user)
  const topics = useSelector(({ user: { topics } }) => topics)
  const filterData = useSelector(({ ambassador: { filter } }) => filter)
  const [value, setValue] = useState(user?.profile?.topics?.map((i) => i.topic))

  const handleSearchSubmit = () => {
    dispatch(searchAmbassadors(filterData))
    if (redirectPath) {
      return router.push(redirectPath)
    }
  }

  const handleClear = () => {
    dispatch(cleanFilter())
    dispatch(getAmbassadoresList())
  }

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),

    // Display none ArrowDWN
    dropdownIndicator: (styles, { data }) => ({
      ...styles,
      display: 'none',
    }),
    indicatorSeparator: (styles, { data }) => ({
      ...styles,
      display: 'none',
    }),
  }

  const onChange = (value) => {
    const obj = {
      ...filterData,
      profile: {
        ...filterData.profile,
        topics: value.value
          ? {
          topic: {
                title: value.value,
              }
           ,
        }  : null,
      },
    }
    dispatch(setFilter(obj))
  }

  const getOptionsFromData = (data) => {
    const options = data && data.map((i) => ({ id: i.id, value: i.title, label: i.title }))
    // setValue(options.map( i => ({topic_id: i.id})))
    return [{ id: 'a1', value: '', label: 'All' }, ...options]
  }

  return (
    <div className="search-block">
      <div className="search-block__content">
        <FormControl.FormControl prefixIcon>
          <FormControl.InputPrefix icon={searchIcon} />
          {/* <FormControl.Input */}
          {/*  handleChange={handleChange} */}
          {/*  type="text" */}
          {/*  value={inputValue} */}
          {/*  placeholder="Enter a conversation topic..." */}
          {/* /> */}
          <Select
            isClearable={false}
            name="topics"
            styles={colourStyles}
            className="input-group input-group_block"
            classNamePrefix="select"
            placeholder="Enter a conversation topic..."
            onChange={onChange}
            options={getOptionsFromData(topics)}
          />
          <FormControl.InputAppend>
            <Button onClick={() => handleSearchSubmit(inputValue)}>Search</Button>
          </FormControl.InputAppend>
          <FormControl.InputAppend>
           <div className="clear-btn">
             <button className="btn btn_block " onClick={() => handleClear()}>Show all</button>
           </div>
          </FormControl.InputAppend>
        </FormControl.FormControl>
      </div>
    </div>
  )
}

export default SearchBlock
