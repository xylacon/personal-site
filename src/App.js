import './style/App.css'

import { useEffect, useState } from 'react'
import { Content, Footer, Sidebar, Tabs } from './components'
import Nav from './data/nav.json'
import { getEleById, searchArrOfObj } from './utils'

function App() {
    useEffect(() => {
        function changeTheme() {
        let dark = window.matchMedia("(prefers-color-scheme: dark)").matches

        if (dark) {
            document.documentElement.setAttribute("data-theme", "dark")
            document.querySelector('meta[name="theme-color"]').setAttribute("content", "#2a283f")
        } else {
            document.documentElement.setAttribute("data-theme", "light")
            document.querySelector('meta[name="theme-color"]').setAttribute("content", "#ece8ff")
        }
        }

        changeTheme()
        
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", changeTheme)
        return () => window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", changeTheme)
    }, [])

    function onClick(event) {
        // Handles all clicks from user

        const e = event.target
        
        if (e.closest("#Sidebar")) {
            onClickSidebar(e)
            return
        }

        toggleInactive() // Set active sidebar node to inactive

        if (e.closest("#Tabs")) {
            onClickTabs(e)
        }
        else if (e.closest("#Content")) {
            console.log("Content")
        }
        else if (e.closest("#Footer")) {
            console.log("Footer")
        }
    }

    const initialId = "home.html"
    const initialOpenTabs = [{...searchArrOfObj(Nav, initialId)}]

    const [activeSidebar, setActiveSidebar] = useState(initialId) // node id
    const [activeBlock, setActiveBlock] = useState(initialId) // ul id
    const [openTabs, setOpenTabs] = useState(initialOpenTabs)
    const [activeTab, setActiveTab] = useState(initialId)
    const [filename, setFilename] = useState(initialId)

    // Sidebar functionality
    function onClickSidebar(e) {
        if (e.id === "Sidebar") {
            toggleActiveSidebar(e)
        }
        else {
            const node = e.closest(".node")
            if (node) {
                toggleActiveSidebar(node)
    
                if (node.classList.contains("title")) {
                    toggleFolder(e)
                }
                else {
                    openNewTab(node.id)
                }
            }
        }
    }
    function toggleActiveSidebar(e) {
        if (activeSidebar && activeSidebar !== e.id) {
            if (activeSidebar === "Sidebar") {
                const sidebar = document.getElementById("Sidebar")
                sidebar.classList.remove("active")
            }
            else {
                const currActive = getEleById(activeSidebar, "Sidebar")
                currActive.classList.remove("active")
                currActive.classList.remove("inactive")
            }
        }

        e.classList.remove("inactive")
        e.classList.add("active")
        setActiveSidebar(e.id)

        if (e.id !== "Sidebar") {
            toggleActiveBlock(e)
        }
    }
    function toggleActiveBlock(e) {
        const newParent = e.parentElement
        const newParentId = newParent.firstElementChild.id

        if (activeBlock && newParentId !== activeBlock) {
            const currParent = getEleById(activeBlock, "Sidebar").parentElement
            currParent.classList.remove("active")
        }

        newParent.classList.add("active")
        setActiveBlock(newParentId)
    }
    function toggleFolder(e) {
        const ul = e.closest("ul")
        if (ul) {
            if (ul.classList.contains("open")) {
                ul.classList.remove("open")
            }
            else {
                ul.classList.add("open")
            }
        }
    }
    function openParentFolder(e) {
        const ul = e.closest("ul")
        if (ul) {
            openParentFolder(ul.parentElement)
            ul.classList.add("open")
        }
    }
    function toggleInactive() {
        if (activeSidebar) {
            if (activeSidebar === "Sidebar") {
                const sidebar = document.getElementById("Sidebar")
                sidebar.classList.remove("active")
                setActiveSidebar()
            }
            else {
                const currActive = getEleById(activeSidebar, "Sidebar")
                currActive.classList.remove("active")
                currActive.classList.add("inactive")
            }
        }
    }
    function toggleActiveInactiveSidebar(e) {
        // This is for when you want to make a non-active node inactive
        // Activate node
        toggleActiveSidebar(e)

        // Inactivate it
        e.classList.remove("active")
        e.classList.add("inactive")
    }

    // Tab functionality
    function openNewTab(id) {
         // If tab isn't already open, add it
        if (!searchArrOfObj(openTabs, id)) {
            setOpenTabs(oldOpenTabs => ([
                ...oldOpenTabs,
                {...searchArrOfObj(Nav, id)}
            ]))
        }

        // Set tab to active
        setTimeout(() => {
            const newTab = getEleById(id, "Tabs")
            toggleActiveTab(newTab)
        }, 0)
    }
    function onClickTabs(e) {
        const tab = e.closest(".tab")
        if (tab) {
            if (e.classList.contains("close")) {
                closeTab(tab)
            }
            else {
                toggleActiveTabAndNode(tab)
            }
        }
    }
    function closeTab(tab) {
        if (tab.id === activeTab) {
            let newTab
            if (tab.nextSibling) {
                toggleActiveTabAndNode(tab.nextSibling)
            }
            else if (tab.previousSibling) {
                toggleActiveTabAndNode(tab.previousSibling)
            }
            else { // If last tab closed, then no active tab
                setActiveTab()
                setFilename("")
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

        // Open content
        setFilename(e.id)
    }
    function toggleActiveTabAndNode(e) {
        toggleActiveTab(e)

        // Toggle node as active
        const sidebarNode = getEleById(e.id, "Sidebar")
        openParentFolder(sidebarNode)
        toggleActiveInactiveSidebar(sidebarNode)
    }

    return (
        <div id="App" onClick={onClick}>
            <Sidebar Nav={Nav} />
            <Tabs openTabs={openTabs} activeTab={activeTab} onClickTabs={onClickTabs} />
            <Content filename={filename} />
            <Footer />
        </div>
    )
}

export default App