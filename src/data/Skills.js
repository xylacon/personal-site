import React from 'react'
import Spacing from '../components/Spacing'

const Skills = () => {
	const whitespace = " "

	return (
		<section className="page">
			<p>
				<span className="variable">programming_lang</span> ={whitespace}
				<span className="brackets">
					<span className="string">C++</span>,{whitespace}
					<span className="string">Java</span>,{whitespace}
					<span className="string">Matlab</span>,{whitespace}
					<span className="string">Python</span>,{whitespace}
					<span className="string">R</span>
				</span>
			</p>
			<p>
				<span className="variable">web_tech</span> ={whitespace}
				<span className="brackets">
					<span className="string">HTML</span>,{whitespace}
					<span className="string">CSS</span>,{whitespace}
					<span className="string">JavaScript</span>,{whitespace}
					<span className="string">React.js</span>,{whitespace}
					<span className="string">ASP.NET</span>
				</span>
			</p>
			<p>
				<span className="variable">cloud_tech</span> ={whitespace}
				<span className="brackets">
					<span className="string">Git</span>,{whitespace}
					<span className="string">AWS</span>
				</span>
			</p>
		</section>
	)
}

export default Skills