import React from 'react'
import Spacing from '../components/Spacing'

const Home = () => {
	const whitespace = " "

	return (
		<section className="page">
			<p>
				<span className="comment html">
					Richard Dylan Denton – Software Engineering & Web Development
				</span>
			</p>
			<Spacing />
			<p>
				Welcome to my personal website!
			</p>
			<Spacing />
			<p>
				I am a recent Computer Science graduate from the <span className='function'><a className='link' href="https://uh.edu/nsm/computer-science/" target='_blank' rel="noreferrer">University of Houston</a></span> with strong interests in:{whitespace}
				<span className="brackets">
					<span className="variable">software_development</span>,{whitespace}
					<span className="variable">web_design</span>,{whitespace}
					<span className="variable">data_science</span>
				</span>
			</p>
			<Spacing />
			<p>
				You are encouraged to explore my work, my background, and the website itself.
			</p>
		</section>
	)
}

export default Home