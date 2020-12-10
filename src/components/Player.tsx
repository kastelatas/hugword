import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '@src/components/Button/IconButton'
import playIcon from '../../public/icons/play-button.svg'

const Player = ({ path }) => {
  // const dispatch = useDispatch()
  // const isAuth = useSelector(({ auth: { user }}) => user)
  const [play, setPlay] = useState(false)

  const ref = useRef()

  /* seEffect(() => {
    setPlay(!play)
  }, [play]) */

  const playVideo = () => {
    setPlay(!play)
    ref.current.pause()
  }

  const playIconVideo = () => {
    setPlay(!play)
    ref.current.play()
  }

  return (
    <div className="video">
      <video ref={ref} type="video/mp4" onClick={playVideo} controls={play && 'controls'}>
        <source src={`${process.env.API_IMG_URL}${path}`} type="video/mp4" />
      </video>
      {!play && <IconButton play icon={playIcon} onClick={playIconVideo} />}
    </div>
  )
}

export default Player
