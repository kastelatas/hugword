import React from 'react'
import InlineSVG from 'react-inlinesvg'
import { deleteTag, editUser } from '@src/redux/actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { UserTypeToString } from '@src/ts/enum/user_enum'
import { searchAmbassadors, setFilter } from '@src/redux/actions/ambassador'

const Tag = (props: { topic: { title: any }; handleTag: any; editMode: boolean; id: any,  }) => {
  const {
    topic: { title },
    id,
    editMode = false,
    form,
  } = props
  const dispatch = useDispatch()
  const user = useSelector(({ auth: { user } }) => user)
  const filterData = useSelector(({ ambassador: { filter } }) => filter)

  const handleDeleteTag = (e, id) => {
    const topics = user.profile?.topics?.filter((i) => i.id !== id).map((i) => ({ id: i.id }))
    dispatch(editUser(user?.id, UserTypeToString[user.type], { topics: [...topics] }))
  }

  const handleSearch = () => {
    const obj = {
      ...filterData,
      profile: {
        ...filterData.profile,
        topics: {
          topic: {
            title,
          },
        },
      },
    }
    dispatch(setFilter(obj))
    dispatch(searchAmbassadors(obj))
  }

  if (editMode) {
    return (
      <div className="tag tag_close" onClick={(e) => handleDeleteTag(e, id)}>
        <span>{title}</span>
        <button className="btn-icon" id={id} type="button">
          <InlineSVG src="/icons/plus-grey.svg" />
        </button>
      </div>
    )
  }

  return (
    //  Клик по тегу должно выделятся по топику
    <div className="tag" onClick={() => handleSearch()}>
      {title}
      {form ? <span> ({id}) </span> : ''}
    </div>
  )
}

export default Tag
