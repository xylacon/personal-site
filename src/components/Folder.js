import { React, useEffect, useState } from 'react'
import Node from './Node'

const Folder = ({ id, label, nodes, level, nodeHeight }) => {
    const contents = nodes.map(node => {
        if (node.children) {
            return <Folder key={node.id} id={node.id} label={node.label} nodes={node.children} level={level + 1} nodeHeight={nodeHeight} />
        }
        return <Node key={node.id} id={node.id} label={node.label} icon={node.icon} level={level + 1} />
    })

    return (
        <ul className="open">
            <Node id={id} label={label} icon={"folder"} level={level} isTitle={true} />
            <div
                className="block-line"
                style={{ height: `calc(100% - ${nodeHeight}px)`, marginLeft: `${15 + (10 * level) + 5}px` }}
            ></div>
            {contents && contents}
        </ul>
    )
}

export default Folder