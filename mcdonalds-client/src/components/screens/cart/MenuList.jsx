import { useEffect, useState } from 'react'

import Loader from '../../ui/Loader.jsx'

import DishService from '../../../services/dish/dish.service.js'

import ShopCard from './ShopCard.jsx'

const MenuList = props => {
	const [items, setItems] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			const data = await DishService.getAll()
			setItems(data.data)
			setLoading(false)
		}

		fetchData()
	}, [])

	const deleteDish = id => {
		DishService.delete(id).then(() => {
			setItems(items.filter(el => el.id !== id))
		})
	}

	return (
		<div className='items'>
			{loading ? (
				<Loader />
			) : items.length ? (
				items.map(item => (
					<ShopCard
						key={item.id}
						{...item}
						appendToCart={props.appendToCart}
						plus={props.plus}
						deleteDish={deleteDish}
					/>
				))
			) : (
				<p>There are no dishes</p>
			)}
		</div>
	)
}

export default MenuList
