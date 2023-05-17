import { useEffect, useState } from 'react'

import { useAdmin } from '../../../hooks/useAdmin'

import UserOrderService from '../../../services/order/user.order.service'
import Layout from '../../layout/Layout'
import OrderItem from '../../order-item/OrderItem'

import styles from './Order.module.scss'

const Order = () => {
	const [orders, setOrders] = useState([])
	const { data } = useAdmin()
	//const { data } = useProfile()
	const role = data?.role
	console.log(role)

	useEffect(() => {
		const fetchData = async () => {
			const data = await UserOrderService.getAll()
			setOrders(data.data)
		}

		fetchData()
	}, [])

	return (
		<Layout>
			<>
				<h2>Orders list</h2>
				<div className={styles.item}>
					{orders.length ? (
						orders.map(order => (
							<>
								<OrderItem key={order.id} order={order} />
							</>
						))
					) : (
						<p>There are no orders</p>
					)}
				</div>
			</>
		</Layout>
	)
}

export default Order
