import React from 'react'
import { BsChevronRight } from "react-icons/bs"

const Tab = ({ id, label, icon, active }) => {
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
        <li id={id} className={active ? "tab active" : "tab"}>
            <div className={icon ? `icon ${icon}` : "icon"}>{getIcon()}</div>
            <p>{label}</p>
            <div className="close">&times;</div>
        </li>
    )
}

export default Tab