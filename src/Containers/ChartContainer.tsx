import React from 'react'
import { Chart } from '@src/components/Chart'
import Pannel from '@src/components/Tabs/Panel'
import Tabs from '@src/components/Tabs/Tabs'

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const daysNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const ChartContainer = ({ chartData }) => {
  const { year, month, week, day } = chartData

  const getLegendData = (legend, data, type) => {
    if ( data && !data.length) {
      return legend.map( i => 0)
    }

    return legend.map((item, idx) => {
      const it = data.find((i) => i[type] === idx + 1)
      return it ? it.sum : 0
    })
  }

  const convertDataToDayName = (data) => {
    return data.map((i) => {
      const d = new Date(i.date)
      const day = daysNames.findIndex((i) => i === d.toLocaleString('eng', { weekday: 'long' }))
      return { date: day, sum: i.sum }
    })
  }

  const convertDataToDayNumber = (data) => {
    return data.map((i) => {
      const d = new Date(i.date)
      return { date: parseInt(d.toLocaleString('eng', { day: 'numeric' })), sum: i.sum }
    })
  }

  const getCurrMonthLength = () => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  }

  return (
    <Tabs>
      <Pannel title="Day">
        <Chart
          chartData={getLegendData(Array.from(Array(24).keys()), convertDataToDayName(day), 'date')}
          legend={Array.from(Array(24).keys())}
        />
      </Pannel>
      <Pannel title="Week">
        <Chart chartData={getLegendData(daysNames, convertDataToDayName(week), 'date')} legend={daysNames} />
      </Pannel>
      <Pannel title="Month">
        <Chart
          chartData={getLegendData(
            Array.from(Array(getCurrMonthLength()), (e, i) => i + 1),
            convertDataToDayNumber(month),
            'date',
          )}
          legend={Array.from(Array(getCurrMonthLength()), (e, i) => i + 1)}
        />
      </Pannel>
      <Pannel title="Year">
        <Chart chartData={getLegendData(monthNames, year, 'month')} legend={monthNames} />
      </Pannel>
    </Tabs>
  )
}

export default ChartContainer
