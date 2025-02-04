import { React, useState, useEffect } from 'react'
import '../style/Tabs.css'
import Tab from './Tab'
import { getEleById, searchArrOfObj } from '../utils'

const Tabs = ({ Nav, activeTab, setActiveTab, activeSidebar }) => {
    // OnDrag events
    const [draggedTab, setDraggedTab] = useState()
    function handleDragStart(event) {
        const tab = event.target.closest(".tab")
        if (tab) {
            toggleActiveTab(tab)
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

    // OnClick events
    const [openTabs, setOpenTabs] = useState([])
    function onClick(event) {
        const e = event.target
        const tab = e.closest(".tab")
        if (!tab) return

        if (e.classList.contains("close")) {
            closeTab(tab)
            return
        }
        
        toggleActiveTab(tab)
    }
    function closeTab(tab) {
        if (tab.id === activeTab) {
            if (tab.nextSibling) {
                toggleActiveTab(tab.nextSibling)
            }
            else if (tab.previousSibling) {
                toggleActiveTab(tab.previousSibling)
            }
            else {
                // If last tab closed, then no active tab
                setActiveTab()
            }
        }

        // remove from list
        setOpenTabs(oldOpenTabs =>
            oldOpenTabs.filter(item => item.id !== tab.id)
        )
    }
    function toggleActiveTab(e) {
        if (activeTab && activeTab !== e.id) {
            const currActive = getEleById(e.id, "Tabs")
            currActive.classList.remove("active")
        }
 
        e.classList.add("active")
        setActiveTab(e.id)
    }
    useEffect(() => {
        // Open new tab

        if (activeTab === activeSidebar) return

        const node = getEleById(activeSidebar, "Sidebar")
        if (!node || node.classList.contains("title")) return

        // If tab isn't already open, add it
        if (!searchArrOfObj(openTabs, activeSidebar)) {
            setOpenTabs(oldOpenTabs => ([
                ...oldOpenTabs,
                {...searchArrOfObj(Nav, activeSidebar)}
            ]))
            return
        }

        const newTab = getEleById(activeSidebar, "Tabs")
        toggleActiveTab(newTab)
    }, [activeSidebar])
    useEffect(() => {
        // After opening new tab, activate tab
        
        if (!openTabs.length) return

        const tabId = openTabs.at(-1).id
        const newTab = getEleById(tabId, "Tabs")
        toggleActiveTab(newTab)
    }, [openTabs])

    const tabs = openTabs && openTabs.map(tab => {
        return <Tab key={tab.id} id={tab.id} label={tab.label} icon={tab.icon} active={tab.id === activeTab} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDrop={handleDrop} isRightHalf={isRightHalf} />
    })

    return (
        <div id="Tabs" onClick={onClick}>
            <ul>
                {tabs && tabs}
            </ul>
            <div className="spacer"></div>
        </div>
    )
}

export default Tabs