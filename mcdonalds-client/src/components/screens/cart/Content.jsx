import { useEffect, useState } from 'react'

import { useAdmin } from '../../../hooks/useAdmin'

import Layout from '../../layout/Layout'

import MenuList from './MenuList'
import ShowAlert from './ShowAlert'

const Content = () => {
	const [cartItems, setCartItems] = useState(() => {
		let cartItems = null
		try {
			cartItems = JSON.parse(localStorage.getItem('cartItems'))
		} catch (err) {}
		return Array.isArray(cartItems) ? cartItems : []
	})

	useEffect(() => {
		localStorage.setItem('cartItems', JSON.stringify(cartItems))
	}, [cartItems])

	// const cartFromLocalStorage = JSON.parse(
	// 	localStorage.getItem('cartItems') || '[]'
	// )

	const [cartShow, setCartShow] = useState(false)
	const [showAlert, setShowAlert] = useState(null)

	const { data } = useAdmin()
	const role = data?.role

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

	const removeCart = () => {
		const newCart = []
		setCartItems(newCart)
		localStorage.setItem('cartItems', JSON.stringify(newCart))
	}

	const toggleShow = () => setCartShow(!cartShow)

	const hideAlert = () => setShowAlert(null)

	return (
		<Layout setItems={setCartItems} items={cartItems}>
			<main className='container'>
				{role === 'user' ? (
					<>
						{/* {/* <CartIcon length={cartItems.length} toggleShow={toggleShow} /> */}
						{showAlert && <ShowAlert text={showAlert} hideAlert={hideAlert} />}
					</>
				) : null}
				<MenuList appendToCart={appendToCart} />
				{/* {cartShow ? (
				<CartList
					items={cartItems}
					toggleShow={toggleShow}
					removeFromCart={removeFromCart}
					removeCart={removeCart}
					plus={plus}
					minus={minus}
				/>
			) : null} */}
			</main>
		</Layout>
	)
}

export default Content
