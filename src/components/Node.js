import React from 'react'

const Node = ({ id, label, icon, level, isTitle, getIcon }) => {
    return (
        <li
            id={id}
            className={isTitle ? "node title" : "node"}
            style={{ paddingLeft: `${15 + (10 * level)}px` }}
        >
            <div className={icon ? `icon ${icon}` : "icon"}>{getIcon(icon)}</div>
            <div className="label">{label}</div>
        </li>
    )
}

export default Node