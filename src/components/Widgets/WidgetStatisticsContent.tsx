import FullStatistics from '@src/components/FullStatistics'
import React from 'react'
import { useSelector } from 'react-redux'

const WidgetStatisticsContent = () => {
  const stat = useSelector(({dashboard:{statistics: {stat}}} ) => stat)


  return (
    <>
      <p className="widget__title">Your statistics</p>
      <FullStatistics title={false} tooltip={false} data={stat} />
    </>
  )
}

export default WidgetStatisticsContent
