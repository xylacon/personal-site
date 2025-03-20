import { React, useState, useEffect } from 'react'
import {
    Home,
    About,
    Contact,
    Skills,
    README
} from '../data'
import '../style/Content.css'

const Content = ({ activeTab, footerHeightChange }) => {
    const [hasShadow, setHasShadow] = useState(false)
    useEffect(() => {
        // Show shadow when user scrolls in #Content

        function handleScroll() {
            const content = document.getElementById("Content")
            if (!content) return

            setHasShadow(content.scrollTop > 0)
        }

        window.addEventListener("scroll", handleScroll, true)
        return () => window.removeEventListener("scroll", handleScroll, true)
    }, [])

    const [activeFile, setActiveFile] = useState()

    useEffect(() => {
        // if (!activeTab) return

        const files = {
            Home: Home,
            About: About,
            Contact: Contact,
            Skills: Skills,
            README: README
        }
        const MyComponent = files[activeTab]
        setActiveFile(MyComponent)
    }, [activeTab])

    const [height, setHeight] = useState(0)
    useEffect(() => {
        // Calculate scroll height
        if (!activeFile) return

        const content = document.getElementById("Content")
        const contentHeight = content.getBoundingClientRect().height

        setHeight(contentHeight)
    }, [activeFile, footerHeightChange])

    return (
        <main
            id="Content"
            className={`scroll ${hasShadow && "shadow"}`}
        >
            {activeFile && activeFile}
            {activeFile && <div style={{ height: `calc(${height}px - 1.4em)` }}></div>}
        </main>
    )
}

export default Content