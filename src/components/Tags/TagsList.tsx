import React from 'react'
import Tag from './Tag'

const TagsList = (props: { topics: any; handleTag?: any; editMode?: boolean }) => {
  const { topics, handleTag, editMode, type, form } = props
  return (
    <div className="tags-block">
      {topics?.map((i) => (
        <Tag {...i} key={i.id} handleTag={handleTag} type={type} form={form} editMode={editMode} />
      ))}
    </div>
  )
}

export default TagsList
