import React, { useState } from 'react'
import { TabsNav } from '@src/components/Tabs'

const TabsContainer = (props: { options: any }) => {
  const { options, handleTabChange } = props

  return <TabsNav options={options} handleActiveTabItem={handleTabChange} />
}

export default TabsContainer
