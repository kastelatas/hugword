import React from 'react'
import classNames from 'classnames'

interface ITextEmptyState {
  text: string
  show: boolean
  centered?: boolean
}


const TextEmptyState: React.FC<ITextEmptyState> = ({ text, centered, show }) => {
  const root = classNames('empty-state', {
    "empty-state_centered": centered
  })

  return <>{show ? <div className={root}>{text}</div> : null}</>
}

export default TextEmptyState
