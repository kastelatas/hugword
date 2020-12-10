import React from "react"
import PriceSettings from "@src/components/PriceSettings"

const WidgetSettingsContent = () => {
  return (
    <>
      <p className="widget__title">Price settings</p>
      <PriceSettings title="Talkens per message" />
    </>
  )
}

export default WidgetSettingsContent