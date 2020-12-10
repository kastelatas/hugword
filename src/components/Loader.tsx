import React from 'react'
import InlineSVG from "react-inlinesvg";
import loaderIcon from '../../public/icons/Rolling.svg'

const Loader = () => {
  return (
    <div className="loader">
      <InlineSVG src={loaderIcon} />
    </div>
  )
}

export default Loader
