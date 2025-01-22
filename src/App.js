import './style/App.css'

import { useEffect, useState, useRef } from 'react'
import { Content, Footer, Sidebar, Tabs } from './components'
import Nav from './data/nav.json'

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
        const e = event.target // Element
        
        if (e.closest("#Sidebar")) {
            onClickSidebar(e)
            return
        }

        // If click is outside Sidebar...
        toggleInactive()
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

    function escapeId(id) {
        // This function escapes '.', which is required for querySelector()
        return id.replace(/\./g, "\\.")
    }

    function searchArrOfObj(arr, id) {
        // This function is tailored for the structure of nav.json
        for (const element of arr) {
            if (element.id === id) { // Found match
                return element
            }

            if (element.children) {
                const result = searchArrOfObj(element.children, id)
                if (result) {
                    return result
                }
            }
        }
    }

    const [activeSidebar, setActiveSidebar] = useState()
    function onClickSidebar(e) {
        if (e.id === "Sidebar") {
            toggleActiveSidebar(e)
            return
        }
        
        const node = e.closest(".node")
        if (!node) { // Do nothing if user didn't click on a node
            return
        }

        toggleActiveSidebar(node)

        if (node.classList.contains("title")) {
            toggleFolder(e)
            return
        }

        openNewTab(node.id)
    }
    function toggleInactive() {
        if (!activeSidebar) {
            return
        }

        const sidebar = document.getElementById("Sidebar")
        if (activeSidebar === "Sidebar") {
            sidebar.classList.remove("active")
            setActiveSidebar()
        }
        else {
            const id = escapeId(activeSidebar)
            const currActive = sidebar.querySelector(`#${id}`)
            currActive.classList.remove("active")
            currActive.classList.add("inactive")
        }
    }
    function toggleActiveSidebar(e) {
        if (e.id === activeSidebar && !e.classList.contains("inactive")) {
            return
        }

        if (activeSidebar) {
            const sidebar = document.getElementById("Sidebar")
            const id = escapeId(activeSidebar)
            const currActive = sidebar.id === activeSidebar ? sidebar : sidebar.querySelector(`#${id}`)
            currActive.classList.remove("active")
            currActive.classList.remove("inactive")
        }

        e.classList.add("active")
        setActiveSidebar(e.id)
    }
    function toggleFolder(e) {
        const ul = e.closest("ul")
        if (!ul) {
            return
        }

        if (ul.classList.contains("open")) {
            ul.classList.remove("open")
            return
        }
        
        ul.classList.add("open")
    }
    const activeSidebarRef = useRef(activeSidebar)
    useEffect(() => {
        activeSidebarRef.current = activeSidebar
    }, [activeSidebar])

    const initialOpenTabs = [{...searchArrOfObj(Nav, "home.html")}]
    const initialActiveTab = "home.html"
    const [openTabs, setOpenTabs] = useState(initialOpenTabs)
    const [activeTab, setActiveTab] = useState(initialActiveTab)
    function openNewTab(id) {
        if (!searchArrOfObj(openTabs, id)) { // If tab isn't already open, add it
            setOpenTabs(oldOpenTabs => ([
                ...oldOpenTabs,
                {...searchArrOfObj(Nav, id)}
            ]))
        }

        // Set tab to active
        setTimeout(() => {
            const tabs = document.getElementById("Tabs")
            const newId = escapeId(id)
            const newTab = tabs.querySelector(`#${newId}`)
            toggleActiveTab(newTab)
        }, 0)
    }
    function onClickTabs(e) {
        const tab = e.closest(".tab")
        if (!tab) {
            return
        }

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
            else { // If last tab closed, then no active tab
                setActiveTab()
            }
        }

        // remove from list
        setOpenTabs(oldOpenTabs =>
            oldOpenTabs.filter(item => item.id !== tab.id)
        )
    }
    function toggleActiveTab(e) {
        if (e.id === activeTab) {
            return
        }

        if (activeTab) {
            const tabs = document.getElementById("Tabs")
            const id = escapeId(activeTab)
            const currActive = tabs.querySelector(`#${id}`)
            currActive.classList.remove("active")
        }

        e.classList.add("active")
        setActiveTab(e.id)

        console.log(e.id, activeSidebarRef.current)

        // ISSUE: activeSidebar does not update in time for this to work
        // Set sidebar node to inactive
        // if (e.id !== activeSidebar) {
        //     const sidebar = document.getElementById("Sidebar")
        //     const id = escapeId(e.id)
        //     const newActive = sidebar.querySelector(`#${id}`).closest(".node")
        //     toggleActiveSidebar(newActive)
        //     toggleInactive()
        // }

        // Open content
    }

    return (
        <div id="App" onClick={onClick}>
            <Sidebar Nav={Nav} />
            <Tabs openTabs={openTabs} activeTab={activeTab} />
            <Content />
            <Footer />
        </div>
    )
}

export default App