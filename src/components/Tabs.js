import React from 'react'
import '../style/Tabs.css'
import Tab from './Tab'

const Tabs = ({ openTabs, activeTab }) => {
    const tabs = openTabs && openTabs.map(tab => {
        return <Tab key={tab.id} id={tab.id} label={tab.label} icon={tab.icon} active={tab.id === activeTab} />
    })

    return (
        <div id="Tabs">
            <ul>
                {tabs && tabs}
            </ul>
            <div className="spacer"></div>
        </div>
    )
}

export default Tabs