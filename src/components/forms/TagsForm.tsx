import React from 'react'
import * as FormControl from '@src/components/Form'
import Button from '@src/components/Button/Button'
import InlineSVG from 'react-inlinesvg'
import CheckBox from '@src/components/CheckBox'
import { useSelector } from 'react-redux'
import { TagsList } from '@src/components/Tags'
import letterIcon from '../../../public/icons/main-letter-rassilka.svg'
import searchIcon from '../../../public/icons/search.svg'

const TagsForm = () => {
  const ambassador = useSelector(({ auth }) => auth)

  return (
    <div className="tags-form">
      <div className="tags-form__icon-mail">
        <InlineSVG src={letterIcon} />
      </div>
      <p className="tags-form__title">Send out invitations to chat with you</p>
      <form action="">
        <FormControl.FormControl>
          <FormControl.Input type="text" placeholder="Type a massage to send..." />
        </FormControl.FormControl>

        <div className="tags-form__checkbox">
          <CheckBox labelText="Send to all users from my contact list" isChecked />
          <CheckBox labelText="Sent to all HugWord users" isChecked />
        </div>
        <p className="tags-form__text">Select a topic</p>
        <FormControl.FormControl prefixIcon>
          <FormControl.InputPrefix icon={searchIcon} />
          <FormControl.Input type="text" placeholder="Enter a conversation topic..." />
        </FormControl.FormControl>

        <div>
          <div className="tags-form__group-topics">
            <TagsList topics={ambassador?.user?.profile?.topics} form />
          </div>
          <div className="tags-form__btn">
            <Button className="btn ">Send</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default TagsForm
