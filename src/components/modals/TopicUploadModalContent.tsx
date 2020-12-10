import React, { useState, useRef, useCallback, useEffect } from 'react'
import { addTopic, editUser } from '@src/redux/actions/user'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { UserTypeToString } from '@src/ts/enum/user_enum'
import Button from '@src/components/Button/Button'
import { TOPICS } from '@src/ts/enum/topics_enum'
import SVG from 'react-inlinesvg'
import * as FormControl from '@src/components/Form'
import classNames from 'classnames'
import searchIcon from '../../../public/icons/search.svg'

const TopicUploadModalContent = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ auth: { user } }) => user)
  const topics = useSelector(({ user: { topics } }) => topics)
  const [value, setValue] = useState(user?.profile?.topics.map((i) => i.topic))
  const [disabled, setDisabled] = useState(false)

  const isCountValid =  value?.length < TOPICS.MAX_MAIN_TOPICS_COUNT
  const root = classNames('select-group',{
    disabled__select: disabled,
  })

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),

    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: 'none',
        fontSize: 18,
      }
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: '#768594',
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: '#b6beca',
      ':hover': {
        backgroundColor: 'none',
        color: '#768594',
        cursor: 'pointer',
      },
    }),
  }

  const getOptionsFromData = (data) => {
    return data && data.map((i) => ({ id: i.id, value: i.title, label: i.title }))
  }

  const convertTopicToPostData = (topics) => {
    return topics && topics.map((i) => ({ topic_id: i.id }))
  }

  const onChange = (value) => {
    setValue(value)
  }

  return (
    <>
      <h3 className="modal__title">Topics Adding</h3>
      <h3 className="modal__notice">
        ({value?.length == null ? '0' : value?.length} of {TOPICS.MAX_MAIN_TOPICS_COUNT})
      </h3>
      <div className={root}>
        <div className="input-group input-group_block">
          <Select
            defaultValue={getOptionsFromData(value)}
            closeMenuOnSelect={false}
            isMulti
            isClearable={false}
            isValidNewOption={false}
            name="topics"
            styles={colourStyles}
            className="input-group input-group_block"
            classNamePrefix="select"
            onChange={onChange}
            noOptionsMessage={ ({ inputValue }) => value?.length === TOPICS.MAX_MAIN_TOPICS_COUNT ? 'You have limit values' : 'No options'}
            options={isCountValid ? getOptionsFromData(topics) : value?.length == null ? getOptionsFromData(topics) : []}
            // options={getOptionsFromData(topics)}
          />
        </div>
      </div>
      <div className="modal__actions">
        <Button
          disabled={value?.length > TOPICS.MAX_MAIN_TOPICS_COUNT}
          onClick={() => dispatch(addTopic(UserTypeToString[user.type], user?.id, { topics: convertTopicToPostData(value) })) }
        >
          Done
        </Button>
      </div>
    </>
  )
}

export default TopicUploadModalContent
