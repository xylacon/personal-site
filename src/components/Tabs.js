import React from 'react'
import '../style/Tabs.css'
import Tab from './Tab'

const Tabs = () => {
  return (
    <div id="Tabs">
      <ul>
        <Tab text="Item 1" active={true} />
        <Tab text="Item 2" />
        <Tab text="Item 3" />
        <Tab text="Item 4" />
      </ul>
      <div className="spacer"></div>
    </div>
  )
}

export default Tabs