import React from 'react'
import { BsChevronRight } from "react-icons/bs"

const Node = ({ id, label, icon, level, isTitle }) => {
    function getIcon() {
        switch (icon) {
            case "folder":
                return <BsChevronRight />
            case "html":
                return "<>"
            default:
                return ""
        }
    }

    return (
        <li id={id} className={isTitle ? "node title" : "node"} style={{paddingLeft: `${15 + (10 * level)}px`}}>
            <div className={icon ? `icon ${icon}` : "icon"}>{getIcon()}</div>
            <div className="label">{label}</div>
        </li>
    )
}

export default Node