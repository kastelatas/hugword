import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const CheckBox = (props: { labelText: any; isChecked: any, onClick: void }) => {
  const { labelText, isChecked, onClick } = props
  const dispatch = useDispatch()
  const [status, setStatus] = useState(false)

  const handleChange = () => {
    setStatus(!status)
    onClick()
    // console.log(status, 'status')
    // dispatch(searchAmbassadorByStatus(status))
  }

  return (
    <div className="checkbox">
      <input type="checkbox" defaultChecked={isChecked} id="checkbox" onChange={handleChange} />
      {labelText && (
        <label className="checkbox__label" htmlFor="checkbox">
          {labelText}
        </label>
      )}
    </div>
  )
}

export default CheckBox
