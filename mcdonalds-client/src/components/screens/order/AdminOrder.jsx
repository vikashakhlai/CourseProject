import { useEffect, useState } from 'react'

import ItemsButton from '../../ui/button/items/ItemsButton'

import { $axios } from '../../../api'
import OrderService from '../../../services/order/order.service'
import Layout from '../../layout/Layout'
import OrderItem from '../../order-item/OrderItem'

import styles from './Order.module.scss'

const AdminOrder = () => {
	const [orders, setOrders] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const data = await OrderService.getAll()
			setOrders(data.data)
		}

		fetchData()
	}, [])

	const deleteOrder = id => {
		return $axios.delete(`/orders/${id}`).then(() => {
			setOrders(orders.filter(el => el.id !== id))
		})
	}

	const setStatus = id => {
		OrderService.setCompleteOrder(id).then(data => {
			const itemIndex = orders.findIndex(value => value.id === id)
			const newOrders = orders.slice()
			newOrders.splice(itemIndex, 1, data.data)
			setOrders(newOrders)
		})
	}

	return (
		<>
			<Layout>
				<h2>Order list</h2>
				<div>
					{orders.length ? (
						orders.map(order => (
							<>
								<div className={styles.item}>
									<OrderItem key={order.id} order={order} />
									{/* <button onClick={() => setStatus(order.id)}>Complete</button> */}
								</div>
								<ItemsButton clickHandler={() => deleteOrder(order.id)}>
									Delete order
								</ItemsButton>
							</>
						))
					) : (
						<p>There are no orders</p>
					)}
				</div>
			</Layout>
		</>
	)
}

export default AdminOrder
