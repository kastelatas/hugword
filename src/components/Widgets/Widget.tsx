import React from 'react'
import classNames from 'classnames'

const Widget = (props) => {
  const { title, typeSettings, typeBilling, typeStatistics, children } = props

  const root = classNames('widget', {
    widget_type_settings: typeSettings,
    widget_type_billing: typeBilling,
    widget_type_statistics: typeStatistics,
  })

  const renderChildren = () => {
    return React.Children.map(children, child => {
      return React.cloneElement(child, {
        data: props.data
      })
    })
  }

  return (
    <div className={root}>
      <h3 className="widget__title">{title}</h3>
      {renderChildren()}
    </div>
  )
}

export default Widget
