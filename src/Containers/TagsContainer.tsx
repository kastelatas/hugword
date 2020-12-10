import React from 'react'
import { TagsList } from '@src/components/Tags'

const TagsContainer = (props: { topics: any }) => {
  const { topics } = props

  const handleTag = (e) => {
    console.log('--------------handleTag------------------', e.target)
  }

  return <TagsList topics={topics} handleTag={handleTag} />
}

export default TagsContainer
