import { React, useState } from 'react'
import { BsChevronRight } from "react-icons/bs"

const Tab = ({ id, label, icon, active, onDragStart, onDragEnd, onDrop, isRightHalf }) => {
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

    const [dropPosition, setDropPosition] = useState()

    function handleDragOver(event) {
        event.preventDefault()
        setDropPosition(isRightHalf(event) ? "right" : "left")
    }

    function handleDragLeave() {
        setDropPosition()
    }

    function handleDrop(event) {
        setDropPosition()
        onDrop(event)
    }

    return (
        <li
            id={id}
            className={active ? "tab active" : "tab"}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {dropPosition === "left" && <div className="drop-indicator left"></div>}
            <div className={icon ? `icon ${icon}` : "icon"}>{getIcon()}</div>
            <p>{label}</p>
            <div className="close">&times;</div>
            {dropPosition === "right" && <div className="drop-indicator right"></div>}
        </li>
    )
}

export default Tab