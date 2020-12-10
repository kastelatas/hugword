import React from 'react'
import { Line } from 'react-chartjs-2'

export const Chart = React.memo(({ chartData, legend }) => {
  const data = (canvas) => {
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, 0, 300)
    gradient.addColorStop(0, 'rgba(63, 170, 255, 1)')
    gradient.addColorStop(1, 'rgba(63, 170, 255, 0.1)')

    return {
      labels: legend,
      datasets: [
        {
          label: '',
          backgroundColor: gradient,
          borderColor: '#3faaff',
          borderWidth: 2,
          gridLines: {
            display: true,
          },
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: chartData,
        },
      ],
    }
  }

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            display: false,
          },
        },
      ],
    },
  }

  return (
    <div>
      <Line data={data} height={350} options={options} />
    </div>
  )
})

export default Chart
