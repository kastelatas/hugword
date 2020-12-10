import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import PushCard from './PushCard'
import plusIcon from '../../public/icons/plus.svg'
import photoIcon from '../../public/icons/photo.svg'
import kakeIcon from '../../public/icons/kake.svg'
import eyeIcon from '../../public/icons/eye.svg'
import { removeNotification } from "@src/redux/actions/notifications";

const PushCardList = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(({notifications : {notifications}}) => notifications)
  const list = [
    {
      _id: uuidv4(),
      cardTypeColor: 'blue',
      icon: plusIcon,
      action: true,
      name: 'Lea Okenr',
      text: 'Book & Movies',
      descr: 'New Ambassador added',
      imgSrc: '/img/6829.png',
    },
  ]
  const [lt, setlt] = useState(list)
  const [fade, setfade] = useState(false)

  useEffect(() => {
    notifications?.length === 6 && dispatch(removeNotification())
  },[notifications?.length])

  /*useEffect(() => {
    const timer = setInterval(add, 5000)

    return () => clearTimeout(timer)
  }, list)*/

  /*const add = () => {
    const pushList = [
      {
        _id: uuidv4(),
        cardTypeColor: 'blue',
        icon: plusIcon,
        action: true,
        name: 'Oliver Orn',
        text: 'A promising newcomer',
        descr: 'New Ambassador added',
        imgSrc: '/img/Layer794.png',
      },
      {
        _id: uuidv4(),
        cardTypeColor: 'purpure',
        icon: kakeIcon,
        action: true,
        name: 'Berti Sever',
        text: 'Book & Movies',
        descr: 'User added photo',
        imgSrc: '/img/Layer691.png',
      },
      {
        _id: uuidv4(),
        cardTypeColor: 'green',
        icon: eyeIcon,
        action: true,
        name: 'Karolin Qert',
        text: ' ',
        descr: 'User added video',
        imgSrc: '/img/Layer786.png',
      },
      {
        _id: uuidv4(),
        cardTypeColor: 'green',
        icon: eyeIcon,
        action: true,
        name: 'Fretmit Okern',
        text: ' ',
        descr: 'Increased his rating in the topic of your interest',
        imgSrc: '/img/Layer793.png',
      },
    ]

    const rand = Math.floor(Math.random() * pushList.length)

    if (lt.length > 3) {

      setfade(!fade)

      const newLT = lt.filter((i, idx) => idx > 5)

      setlt(newLT.concat(pushList[newLT.length + 1]))

      // setlt(newLT.concat(pushList))

      return false
    }
    setlt(lt.concat(pushList[lt.length - 1]))
  }*/
  // const notifications = useSelector(({ notifications: { notifications } }) => notifications)
  return (
    <div>
      { notifications?.map((i, idx) => (
        <PushCard key={i._id} {...i} fade={fade} idx={idx} length={notifications?.length} />
      ))}
    </div>
  )
  // return Boolean(notifications.length) && notifications.map((i) => <PushCard key={i._id} {...i} />)
}

export default PushCardList
