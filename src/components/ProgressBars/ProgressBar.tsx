import React from 'react'

const ProgressBar = ({ val }) => {
  return (
    <div className="progress-bar">
      <div className="progress-bar__bar" style={{ width: `${val}%` }}>
        <div className="progress-bar__text">
          {val}%
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
