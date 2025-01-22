import React from 'react'
import Node from './Node'

const Folder = ({ id, label, nodes, level }) => {
    const contents = nodes.map(node => {
        if (node.children) {
            return <Folder key={node.id} id={node.id} label={node.label} nodes={node.children} level={level + 1} />
        }
        return <Node key={node.id} id={node.id} label={node.label} icon={node.icon} level={level + 1} />
    })

    return (
        <ul>
            <Node id={id} label={label} icon={"folder"} level={level} isTitle={true} />
            {contents && contents}
        </ul>
    )
}

export default Folder