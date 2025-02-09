import { React } from 'react'
import Node from './Node'

const Folder = ({ id, label, nodes, level, nodeHeight, getIcon }) => {
    const contents = nodes.map(node => {
        if (node.children) {
            return <Folder key={node.id} id={node.id} label={node.label} nodes={node.children} level={level + 1} nodeHeight={nodeHeight} getIcon={getIcon} />
        }
        return <Node key={node.id} id={node.id} label={node.label} icon={node.icon} level={level + 1} getIcon={getIcon} />
    })

    return (
        <ul className="open">
            <Node id={id} label={label} icon={"folder"} level={level} isTitle={true} getIcon={getIcon} />
            <div
                className="block-line"
                style={{ height: `calc(100% - ${nodeHeight}px)`, marginLeft: `${15 + (10 * level) + 5}px` }}
            ></div>
            {contents && contents}
        </ul>
    )
}

export default Folder