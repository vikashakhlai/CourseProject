import { useState } from 'react'
import { FiX } from 'react-icons/fi'

import CartButton from '../../ui/button/cart/CartButton'

import { $axios } from '../../../api'

import CartItem from './CartItem'
import ShowAlert from './ShowAlert'

const CartList = props => {
	const [showAlert, setShowAlert] = useState(null)
	const [cartItems, setCartItems] = useState(() => {
		let cartItems = null
		try {
			cartItems = JSON.parse(localStorage.getItem('cartItems'))
		} catch (err) {}
		return Array.isArray(cartItems) ? cartItems : []
	})

	const hideAlert = () => setShowAlert(null)

	const cost =
		Math.round(
			props.items.reduce((sum, item) => sum + item.cost * item.quantity, 0) *
				100
		) / 100
	const allCalories = props.items.reduce(
		(cal, item) => cal + item.calories * item.quantity,
		0
	)

	const createOrder = async () => {
		const items = props.items.map(el => {
			return new Object({
				dishId: el.id,
				price: el.cost,
				quantity: el.quantity
			})
		})

		const body = {
			comment: 'Com1',
			items: items,
			totalPrice: cost
		}
		if (allCalories >= 2000) {
			setShowAlert('Превышение по суточной норме калорий')
		}

		await $axios.post('/users/orders', body)

		props.removeCart()

		console.log('Order added')
	}

	return (
		<div className='cart-modal'>
			{showAlert && <ShowAlert text={showAlert} hideAlert={hideAlert} />}

			<FiX className='cart-modal-close' onClick={props.toggleShow} />
			<h5 className='red-text text-lighten-1'>Cart</h5>
			{props.items.length ? (
				<>
					<table className='striped'>
						<thead>
							<tr>
								<th>Delete</th>
								<th>Count</th>
								<th>Add</th>
								<th>Name</th>
								<th>Price</th>
								<th>Calories</th>
								<th>Total</th>
								<th>Drop</th>
							</tr>
						</thead>
						<tbody>
							{props.items.map(item => (
								<CartItem
									key={item.id}
									{...item}
									removeFromCart={props.removeFromCart}
									plus={props.plus}
									minus={props.minus}
								/>
							))}
							<tr>
								<td>
									<b>Total:</b>
								</td>
								<td>{cost}$</td>
								<td>
									<b>Calories:</b>
								</td>
								<td colSpan={2}>{allCalories} cal.</td>
							</tr>
						</tbody>
					</table>
					{/* <button onClick={() => createOrder()}>Order</button> */}
					<CartButton clickHandler={() => createOrder()}>Order</CartButton>
				</>
			) : (
				<p>Cart is empty</p>
			)}
		</div>
	)
}

export default CartList
