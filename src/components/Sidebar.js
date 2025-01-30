import { React, useEffect, useState } from 'react'
import Folder from './Folder'
import Node from './Node'
import '../style/Sidebar.css'

const Sidebar = ({ Nav }) => {
    const [nodeHeight, setNodeHeight] = useState(0)
    const titleId = "Title"

    useEffect(() => {
        const node = document.getElementById(titleId)
        const height = node.getBoundingClientRect().height
        setNodeHeight(height)
    },[])

    const level = 0

    const contents = Nav && Nav.map(node => {
        if (node.children) {
            return <Folder key={node.id} id={node.id} label={node.label} nodes={node.children} level={level + 1} nodeHeight={nodeHeight} />
        }
        return <Node key={node.id} id={node.id} label={node.label} icon={node.icon} level={level + 1} />
    })

    return (
        <nav id="Sidebar">
            <ul className='open'>
                <Node id={titleId} label={"Richard Denton"} icon={"folder"} level={level} isTitle={true} />
                {contents && contents}
            </ul>
        </nav>
    )
}

export default Sidebar