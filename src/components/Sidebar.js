import { React, useEffect, useState } from 'react'
import Folder from './Folder'
import Node from './Node'
import '../style/Sidebar.css'
import { getEleById } from '../utils'

const Sidebar = ({ Nav, activeSidebar, setActiveSidebar, activeTab }) => {
    // Set proper size for block lines
    const [nodeHeight, setNodeHeight] = useState(0)
    const titleId = "Title"
    useEffect(() => {
        const node = document.getElementById(titleId)
        const height = node.getBoundingClientRect().height
        setNodeHeight(height)
    },[])

    // OnClick events
    const [activeBlock, setActiveBlock] = useState() // ul id
    function onClick(event) {
        const e = event.target
        if (e.id === "Sidebar") {
            toggleActiveSidebar(e)
            return
        }

        const node = e.closest(".node")
        if (!node) return

        toggleActiveSidebar(node)
        if (node.classList.contains("title")) {
            toggleFolder(e)
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
        if (!ul) return

        ul.classList.contains("open") ? ul.classList.remove("open") : ul.classList.add("open")
    }
    function openParentFolder(e) {
        const ul = e.closest("ul")
        if (!ul) return

        openParentFolder(ul.parentElement)
        ul.classList.add("open")
    }
    useEffect(() => {
        if (activeSidebar === activeTab) return
        if (activeTab) {
            const node = getEleById(activeTab, "Sidebar")

            toggleActiveSidebar(node)
            node.classList.remove("active")
            node.classList.add("inactive")

            openParentFolder(node)
        }
        else {
            const node = getEleById(activeSidebar, "Sidebar")
            node.classList.remove("active")
            node.classList.remove("inactive")

            setActiveSidebar()
        }
    }, [activeTab])

    // Get folder structure
    const level = 0
    const contents = Nav && Nav.map(node => {
        if (node.children) {
            return <Folder key={node.id} id={node.id} label={node.label} nodes={node.children} level={level + 1} nodeHeight={nodeHeight} />
        }
        return <Node key={node.id} id={node.id} label={node.label} icon={node.icon} level={level + 1} />
    })

    return (
        <nav id="Sidebar" onClick={onClick}>
            <ul className='open'>
                <Node id={titleId} label={"Richard Denton"} icon={"folder"} level={level} isTitle={true} />
                {contents && contents}
            </ul>
        </nav>
    )
}

export default Sidebar