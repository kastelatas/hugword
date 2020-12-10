import React, { useState } from 'react'
import IconButton from '@src/components/Button/IconButton'
import plusIcon from '../../public/icons/plus-grey.svg'
import minusIcon from '../../public/icons/minus-grey.svg'
import { editUser } from "@src/redux/actions/user";
import { useDispatch, useSelector } from "react-redux";

const Counter = ({defaultValue}) => {
  const dispatch = useDispatch()
  const user = useSelector(({auth: {user}}) => user)
  const [value, setValue] = useState(defaultValue)

  const handlerInc = () => {
    const newVal = value - 1
    newVal >= 0 && setValue(newVal)
    dispatch(editUser(user?.id, 'ambassador', { price: `${newVal}` }))
  }

  const handlerDic = () => {
    const newVal = value + 1
    newVal >= 0 && setValue(newVal)
    dispatch(editUser(user?.id, 'ambassador', { price: `${newVal}` }))
  }

  return (
    <div className="counter">
      <IconButton icon={minusIcon} onClick={value > 0 ? handlerInc : undefined} />
      <div className="counter__count">{value}</div>
      <IconButton icon={plusIcon} onClick={handlerDic} />
    </div>
  )
}

export default Counter
