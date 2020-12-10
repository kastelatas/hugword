import React from 'react'
import Comment from './Comment'

const CommentsList = ({comments, ava, isReviews, profileComments}) => {
  // let spliceComment = comments.splice(0, 2 )
  // console.log(comments[comments.length - 1])
  // console.log(comments)
  // console.log(comments.splice(0, 1 ))

  // let profileComment = profile ? spliceComment : comments
  return (
    <>
      {comments?.map((i) => (
        <Comment key={i.id} {...i} ava={ava} isReviews={isReviews} />
      ))}
    </>
  )
}

export default CommentsList
