import { useEffect, useState } from 'react'

import { useAdmin } from '../../../hooks/useAdmin.js'

import DishService from '../../../services/dish/dish.service.js'
import Layout from '../../layout/Layout.jsx'
import Content from '../cart/Content.jsx'

const Dish = () => {
	const [dishes, setDishes] = useState([])
	const { data } = useAdmin()
	const role = data?.role

	useEffect(() => {
		const fetchData = async () => {
			const data = await DishService.getAll()
			setDishes(data.data)
		}

		fetchData()
	}, [])

	/////////

	return (
		<div>
			<div>
				<Layout>
					<Content />

					{/* {dishes.length ? (
					dishes.map(dish => (
						<DishItem key={dish.id} dish={dish} readMore='Read more' />
					))
				) : (
					<p>There are no dishes</p>
				)} */}
				</Layout>
			</div>
		</div>
	)
}

export default Dish
