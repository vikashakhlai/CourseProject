import { useState } from 'react'
import { FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import CartButton from '../../../ui/button/cart/CartButton'

import CartItem from '../../../screens/cart/CartItem'
import ShowAlert from '../../../screens/cart/ShowAlert'

import { $axios } from '../../../../api'
import Layout from '../../Layout'

const CartPage = () => {
	const [cartItems, setCartItems] = useState(() => {
		let cartItems = null
		try {
			cartItems = JSON.parse(localStorage.getItem('cartItems'))
		} catch (err) {}
		return Array.isArray(cartItems) ? cartItems : []
	})
	const [showAlert, setShowAlert] = useState(null)

	console.log(cartItems)

	const plus = (item, quantity = 1) => {
		const itemIndex = cartItems.findIndex(value => value.id === item.id)

		const newItem = {
			...cartItems[itemIndex],
			quantity: cartItems[itemIndex].quantity + quantity
		}
		const newCart = cartItems.slice()
		newCart.splice(itemIndex, 1, newItem)
		setCartItems(newCart)
		localStorage.setItem('cartItems', JSON.stringify(newCart))
	}

	const minus = (item, quantity = 1) => {
		const itemIndex = cartItems.findIndex(value => value.id === item.id)
		console.log()
		if (cartItems[itemIndex].quantity == 1) {
			removeFromCart(cartItems[itemIndex].id)
			return
		}

		const newItem = {
			...cartItems[itemIndex],
			quantity: cartItems[itemIndex].quantity - quantity
		}
		const newCart = cartItems.slice()
		newCart.splice(itemIndex, 1, newItem)
		setCartItems(newCart)
		localStorage.setItem('cartItems', JSON.stringify(newCart))
	}

	const appendToCart = (item, quantity = 1) => {
		const itemIndex = cartItems.findIndex(value => value.id === item.id)
		if (itemIndex < 0) {
			const newItem = {
				...item,
				quantity: quantity
			}
			setCartItems([...cartItems, newItem])
			localStorage.setItem('cartItems', JSON.stringify(...cartItems, newItem))
		} else {
			const newItem = {
				...cartItems[itemIndex],
				quantity: cartItems[itemIndex].quantity + quantity
			}
			const newCart = cartItems.slice()
			newCart.splice(itemIndex, 1, newItem)
			setCartItems(newCart)

			localStorage.setItem('cartItems', JSON.stringify(newCart))
		}

		setShowAlert(item.name + ' добавлен в корзину')
	}

	const removeFromCart = id => {
		const newCart = cartItems.filter(item => item.id !== id)
		setCartItems(newCart)
		localStorage.setItem('cartItems', JSON.stringify(newCart))
	}
	const [cartShow, setCartShow] = useState(false)

	const removeCart = () => {
		const newCart = []
		setCartItems(newCart)
		localStorage.setItem('cartItems', JSON.stringify(newCart))
	}

	const cost =
		Math.round(
			cartItems.reduce((sum, item) => sum + item.cost * item.quantity, 0) * 100
		) / 100

	const createOrder = async () => {
		const items = cartItems.map(el => {
			return new Object({
				dishId: el.id,
				price: el.cost,
				quantity: el.quantity
			})
		})

		const body = {
			// comment: 'Com1',
			items: items,
			totalPrice: cost
		}
		if (allCalories >= 2000) {
			setShowAlert('Превышение по суточной норме калорий')
		}

		await $axios.post('/users/orders', body)

		removeCart()

		console.log('Order added')
	}

	const toggleShow = () => setCartShow(!cartShow)

	const hideAlert = () => setShowAlert(null)

	const allCalories = cartItems.reduce(
		(cal, item) => cal + item.calories * item.quantity,
		0
	)

	return (
		<Layout>
			<div className='cart-modal'>
				{showAlert && <ShowAlert text={showAlert} hideAlert={hideAlert} />}

				<Link to='/menu'>
					<FiX className='cart-modal-close' onClick={toggleShow} />
				</Link>
				<h5 className='red-text text-lighten-1'>Cart</h5>
				{cartItems.length ? (
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
								{cartItems.map(item => (
									<CartItem
										key={item.id}
										{...item}
										removeFromCart={removeFromCart}
										plus={plus}
										minus={minus}
									/>
								))}
								<tr>
									<td>
										<b>Total:</b>
									</td>
									<td>{cartItems.cost}$</td>
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
		</Layout>
	)
}

export default CartPage
