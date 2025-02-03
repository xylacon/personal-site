import { React, useState, useEffect } from 'react'
// import {
//     home
// } from '../data'
import Home from '../data/Home'
import '../style/Content.css'

const Content = ({ activeTab }) => {
    const [activeFile, setActiveFile] = useState()

    useEffect(() => {
        if (!activeTab) return

        const files = {
            Home: Home
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