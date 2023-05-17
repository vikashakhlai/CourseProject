import styles from './OrderItem.module.scss'

const OrderItem = ({ order }) => {
	return (
		<div className={styles.item} key={order.id}>
			<p>Order {order.id}</p>
			<span>Order price:</span>
			<span>&nbsp; {order.totalPrice}$</span>
			{order.isCompleted ? <p>Status: Ready</p> : <p>Status: Not ready</p>}

			<div>
				<div className={styles.container}>
					{order.dishes.length ? (
						order.dishes.map(dish => (
							<div className={styles.element}>
								<ul key={dish.id}>
									<li>
										<div className={styles.image}>
											<img
												className={styles.image}
												src={import.meta.env.VITE_SERVER_URL + dish.dish.images}
											></img>
										</div>
									</li>
									<li>
										<span>{dish.dish.name}</span>
									</li>
									<li>
										<span>{dish.dish.cost}$</span>
									</li>
									<li>
										<span>Quantity: {dish.quantity}</span>
									</li>
								</ul>
							</div>
						))
					) : (
						<p>There are no dishes</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default OrderItem
