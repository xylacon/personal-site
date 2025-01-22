import React from 'react'

const Tab = ({ id, label, icon, active }) => {
    return (
        <li id={id} className={active ? "tab active" : "tab"}>
            {icon && icon}
            <p>{label}</p>
            <div className="close">&times;</div>
        </li>
    )
}

export default Tab