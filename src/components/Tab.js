import React from 'react'

const Tab = ({ icon, text, active }) => {
  return (
	  <div className={active ? "tab active" : "tab"}>
      {icon && icon}
      <li>{text}</li>
      <div className="close">&times;</div>
    </div>
  )
}

export default Tab