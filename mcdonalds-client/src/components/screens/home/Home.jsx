import { useNavigate } from 'react-router-dom'

import Layout from '../../layout/Layout'

import Content from './Content'
import Hero from './hero/Hero'

function Home() {
	const navigate = useNavigate()

	return (
		<div>
			<Layout>
				<Hero />
				<Content />
			</Layout>
		</div>
	)
}

export default Home
