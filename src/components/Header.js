import { React, useState, useEffect } from 'react'
import '../style/Header.css'
import { BiDockBottom, BiSolidDockBottom, BiDockLeft, BiSolidDockLeft } from "react-icons/bi";

const Header = ({ isActiveFooter, setIsActiveFooter }) => {
	const [isActiveSidebar, setIsActiveSidebar] = useState(true)

	useEffect(() => {
		let width = 0;
		if (isActiveSidebar) width = 175;
		document.documentElement.style.setProperty("--sidebar-width", `${width}px`);
	}, [isActiveSidebar])
	useEffect(() => {
		let height = "0";
		if (isActiveFooter) height = "150px";
		document.documentElement.style.setProperty("--footer-height", `${height}`);
	}, [isActiveFooter])

	return (
		<header id='Header'>
			<div className="icons">
				<div className="sidebar-icon" onClick={() => setIsActiveSidebar((old) => !old)}>
					{isActiveSidebar ? <BiSolidDockLeft /> : <BiDockLeft />}
				</div>
				{/* <div
					className="footer-icon" onClick={() => setIsActiveFooter((old) => !old)}>
					{isActiveFooter ? <BiSolidDockBottom /> : <BiDockBottom />}
				</div> */}
			</div>
		</header>
	)
}

export default Header