import React from 'react'
import AchievementsItem from '@src/components/Achievements/AchievementsItem'

const AchievementsList = () => {
  const achiv = [1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <>
      {achiv.map((i) => {
        return <AchievementsItem />
      })}
    </>
  )
}

export default AchievementsList
