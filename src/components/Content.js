import { React, useState, useEffect } from 'react'
import {
    Home,
    About,
    Contact,
    Skills
} from '../data'
import '../style/Content.css'

const Content = ({ activeTab }) => {
    const [activeFile, setActiveFile] = useState()

    useEffect(() => {
        if (!activeTab) return

        const files = {
            Home: Home,
            About: About,
            Contact: Contact,
            Skills: Skills
        }
        const MyComponent = files[activeTab]
        setActiveFile(MyComponent)
    }, [activeTab])

    return (
        <main id="Content">
            {activeFile && activeFile}
        </main>
    )
}

export default Content