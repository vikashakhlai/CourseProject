import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

import NotFound from '../components/screens/not-found/NotFound'

import { socket } from '../../socket'

import { routes } from './routes.data'

const Router = () => {
	const { isAuth } = useAuth()

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
		<BrowserRouter>
			<Routes>
				{routes.map(route => {
					if (route.isAuth && !isAuth) {
						return false
					}

					return (
						<Route
							key={route.path}
							path={'/CourseProject' + route.path}
							element={<route.component />}
						/>
					)
				})}
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
