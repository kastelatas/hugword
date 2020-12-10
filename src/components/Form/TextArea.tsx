import React, { useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import Button from '@src/components/Button/Button'
import useOutsideClick from '../../hooks/useOutsideClick'
import editIcon from '../../../public/icons/pencil.svg'
import TextareaAutosize from 'react-textarea-autosize';

const EditableTextArea = (props) => {
  const { textValue, rows, getTextCount, handleAction, user, textBold, limit } = props
  const node = useRef()
  const dispatch = useDispatch()
  const [value, setValue] = useState('Enter text about you')
  const [isEdit, setEdit] = useState(false)

  const root = classNames('edit-text', {
    'edit-text_text_bold': textBold,
  })

  const initTextValue = textValue

  useEffect(() => {
    textValue && setValue(textValue)
  }, [textValue])

  useOutsideClick(isEdit && node, () => {
    textValue !== value && handleAction && dispatch(handleAction(user?.id, value))
    return setEdit(false)
  })

  const handleNewTextValue = (e) => setEdit(true)
  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    getTextCount && getTextCount(value.length)
    limit ? setValue(event.target.value.substring(0, limit)) : setValue(event.target.value)
  }

  return (
    <>
      {!isEdit ? (
        <>
          <p className={root} onClick={handleNewTextValue}>
            {value} <Button icon={editIcon} onClick={() => setEdit(true)} />
          </p>
        </>
      ) : (
        <TextareaAutosize
          className={root}
          autoFocus
          ref={node}
          value={value}
          onClick={handleNewTextValue}
          onChange={handleChange}
        />
      )}
    </>
  )
}

export default EditableTextArea
