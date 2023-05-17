import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { socket } from '../../../../socket'
import Layout from '../../layout/Layout'

function Home() {
	const navigate = useNavigate()

	useEffect(() => {
		const onAddDish = () => {
			alert('Dish added')
		}
		socket.on('addDish', onAddDish)
		return () => {
			socket.off('addDish', onAddDish)
		}
	})

	return (
		<div>
			<Layout></Layout>
		</div>
	)
}

export default Home
