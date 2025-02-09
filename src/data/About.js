import React from 'react'
import Spacing from '../components/Spacing'

const About = () => {
	return (
		<section className="page">
			<p>
				My name is <span className="string">Richard Dylan Denton</span> and I am a passionate developer with a B.S. in Computer Science.
			</p>
			<Spacing />
			<p>
				<strong>Something about experience...</strong>
			</p>
			<Spacing />
			<p>
				<strong>Something about my hobbies...</strong>
				Beyond development, I enjoy photography and ...
			</p>
		</section>
	)
}

export default About