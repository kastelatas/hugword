import React, { useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import InlineSVG from 'react-inlinesvg'
import { useDispatch } from 'react-redux'
import { UserTypeToString } from '@src/ts/enum/user_enum'
import Button from '@src/components/Button/Button'
import useOutsideClick from '../../hooks/useOutsideClick'
import editIcon from '../../../public/icons/pencil.svg'

const EditableInput = ({ textValue, errorText = 'Not valid', pattern = false, handleAction, type, user, textBold }) => {
  const node = useRef()
  const dispatch = useDispatch()
  const [value, setValue] = useState('Enter text about you')
  const [validValue, setValid] = useState(true)
  const [isEdit, setEdit] = useState(false)
  const root = classNames('edit-text edit-text_type_input ', {
    'edit-text_text_bold': textBold,
  })

  const initTextValue = textValue

  useEffect(() => {
    textValue && setValue(textValue)
  }, [textValue])

  useOutsideClick(isEdit && node, () => {
    validValue && initTextValue !== value && handleAction && dispatch(handleAction(user?.id, value))
    !validValue && setValue(textValue)
    setValid(true)
    return setEdit(false)
  })

  const handleNewTextValue = (e) => setEdit(true)
  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setValue(event.target.value)
    setValid(event.target.validity.valid)
  }

  return (
    <>
      {!isEdit ? (
        <>
          <p className={root} onClick={handleNewTextValue}>
            {' '}
            {value}{' '}
          </p>
          <Button icon={editIcon} onClick={() => setEdit(true)} />
        </>
      ) : (
        <div style={{ position: 'relative' }}>
          <input
            className={root}
            autoFocus
            ref={node}
            type={type}
            style={{ width: '100%' }}
            pattern={pattern}
            // pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
            required
            value={value}
            onClick={handleNewTextValue}
            onChange={handleChange}
          />
          {!validValue && (
            <div style={{ position: 'absolute', left: 8 }} className="input-group__invalid">
              {errorText}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default EditableInput
