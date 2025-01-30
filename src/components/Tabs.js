import { React, useState } from 'react'
import '../style/Tabs.css'
import Tab from './Tab'

const Tabs = ({ openTabs, activeTab, onClickTabs }) => {
    const [draggedTab, setDraggedTab] = useState()

    function handleDragStart(event) {
        const tab = event.target.closest(".tab")
        if (tab) {
            onClickTabs(tab)
            setDraggedTab(tab)
        }
    }

    function handleDragEnd() {
        setDraggedTab()
    }

    function handleDrop(event) {
        const targetTab = event.target.closest(".tab")

        if (targetTab && draggedTab && draggedTab.id !== targetTab.id) {
            // Get tab indices in openTabs
            const draggedIndex = openTabs.findIndex(tab => tab.id === draggedTab.id)
            const targetIndex = openTabs.findIndex(tab => tab.id === targetTab.id)

            if (draggedIndex === -1 || targetIndex === -1) {
                console.error("Cannot find dragged and/or target indices")
                return
            }

            // Rearrange tabs
            const [movedTab] = openTabs.splice(draggedIndex, 1)
            const rightHalf = isRightHalf(event)
            let insertIndex = rightHalf ? targetIndex + 1 : targetIndex
            if (draggedIndex < targetIndex && !rightHalf) {
                insertIndex--;
            }
            openTabs.splice(insertIndex, 0, movedTab)
        }
    }

    function isRightHalf(event) {
        // Determine which half of tab the mouse is on

        const tab = event.target.closest(".tab")
        const rect = tab.getBoundingClientRect()
        const mouseX = event.clientX
        
        return mouseX > rect.left + (rect.width / 2)
    }

    const tabs = openTabs && openTabs.map(tab => {
        return <Tab key={tab.id} id={tab.id} label={tab.label} icon={tab.icon} active={tab.id === activeTab} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDrop={handleDrop} isRightHalf={isRightHalf} />
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