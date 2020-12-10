import React, { useState } from 'react'
import SVG from 'react-inlinesvg'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '@src/redux/actions/modals'
import { ModalsType } from '@src/ts/enum/modal_enum'
import IconButton from '@src/components/Button/IconButton'

const HelpForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ auth: { user } }) => user)
  const topics = useSelector(({ user: { topics } }) => topics)
  const [value, setValue] = useState(user?.profile?.topics?.map((i) => i.topic))

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    // Display none ArrowDWN
    // dropdownIndicator: (styles, {data}) => ({
    //     ...styles,
    //     display:'none'
    // }),
    indicatorSeparator: (styles, { data }) => ({
      ...styles,
      display: 'none',
    }),
  }

  const onChange = (value) => setValue(value)

  const getOptionsFromData = (data) => {
    const options = data && data.map((i) => ({ id: i.id, value: i.title, label: i.title }))
    // setValue(options.map( i => ({topic_id: i.id})))
    return options
  }

  return (
    <form action="" className="help-page__form">
      <h2>Contacting HugWord support service</h2>
      <div className="input-group input-group_block">
        <span className="input-group__icon">
          <SVG src="/icons/main-check-red.svg" />
        </span>
        <Select
          isClearable={false}
          name="topics"
          styles={colourStyles}
          className="input-group input-group_block"
          classNamePrefix="select"
          placeholder="Select a theme-treatment"
          onChange={onChange}
          options={getOptionsFromData(topics)}
        />
      </div>
      <div className="input-group input-group_block">
        <span className="input-group__icon">
          <SVG src="/icons/main-text.svg" />
        </span>
        <input type="text" placeholder="Please describe in detail your problem with HugWord service" />
      </div>
      <div className="help-page__actions">
        <button
          className="btn btn_block btn-outline-primary"
          type="button"
          onClick={() => dispatch(openModal({ modalType: ModalsType.IMG_UPLOAD, imgType: 'photos' }))}
        >
          Add skreenshot
        </button>
        <button className="btn btn_block" type="button">
          Сreate a ticket
        </button>
      </div>
    </form>
  )
}

export default HelpForm
