import './style/App.css'

import { useEffect, useState } from 'react'
import { Content, Footer, Sidebar, Tabs } from './components'
import Nav from './data/nav.json'
import { getEleById } from './utils'

function App() {
    useEffect(() => {
        // This handles changing the color scheme when the user changes their device system between light/dark mode

        function changeTheme() {
            let dark = window.matchMedia("(prefers-color-scheme: dark)").matches

            if (dark) {
                document.documentElement.setAttribute("data-theme", "dark")
                document.querySelector('meta[name="theme-color"]').setAttribute("content", "#000000")
            } else {
                document.documentElement.setAttribute("data-theme", "light")
                document.querySelector('meta[name="theme-color"]').setAttribute("content", "#ffffff")
            }
        }

        changeTheme()
        
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", changeTheme)
        return () => window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", changeTheme)
    }, [])

    function onClick(event) {
        if (!event.target.closest("#Sidebar")) toggleInactive()
    }

    const [activeSidebar, setActiveSidebar] = useState() // node id
    const [activeTab, setActiveTab] = useState() // tab id

    // Sidebar functionality
    function toggleInactive() {
        if (!activeSidebar) return

        if (activeSidebar === "Sidebar") {
            const sidebar = document.getElementById("Sidebar")
            sidebar.classList.remove("active")
            setActiveSidebar()
            return
        }

        const currActive = getEleById(activeSidebar, "Sidebar")
        currActive.classList.remove("active")
        currActive.classList.add("inactive")
    }

    return (
        <div id="App" onClick={onClick}>
            <Sidebar Nav={Nav} activeSidebar={activeSidebar} setActiveSidebar={setActiveSidebar} activeTab={activeTab} />
            <Tabs Nav={Nav} activeTab={activeTab} setActiveTab={setActiveTab} activeSidebar={activeSidebar} />
            <Content activeTab={activeTab} />
            <Footer />
        </div>
    )
}

export default App