import { useEffect, useState } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { IoMdArrowBack } from 'react-icons/io'
import { SlUser } from 'react-icons/sl'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAdmin } from '../../../hooks/useAdmin'
import { useAuth } from '../../../hooks/useAuth'

import ShowAlert from '../../screens/cart/ShowAlert'

import { TOKEN } from '../../../app.constants'

import styles from './Header.module.scss'

const Header = ({ backLink = '/' }) => {
	const { pathname } = useLocation()
	const navigate = useNavigate()

	const { isAuth, setIsAuth } = useAuth()

	const { data } = useAdmin()
	const role = data?.role

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

	const [cartShow, setCartShow] = useState(false)
	const [showAlert, setShowAlert] = useState(null)

	const removeFromCart = id => {
		const newCart = cartItems.filter(item => item.id !== id)
		setCartItems(newCart)
		localStorage.setItem('cartItems', JSON.stringify(newCart))
	}

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

		if (cartItems[itemIndex].quantity == 1) {
			removeFromCart(cartItems[itemIndex].id)
			return
		}

		const newItem = {
			...cartItems[itemIndex],
			quantity: cartItems[itemIndex].quantity - quantity
		}
		const newCart = cartItems.slice() // копия массива cartItems
		newCart.splice(itemIndex, 1, newItem)
		setCartItems(newCart)
		localStorage.setItem('cartItems', JSON.stringify(newCart))
	}

	const toggleShow = () => setCartShow(!cartShow)

	const logoutHandler = () => {
		localStorage.removeItem(TOKEN)
		localStorage.clear()
		// Cookies.remove(TOKEN)
		setIsAuth(false)
		navigate('/auth')
	}

	return (
		<header className={styles.header}>
			<Link to='/'>
				<img height={100} width={100} src='/mainLogo.svg'></img>
			</Link>
			{isAuth && (
				<>
					{pathname !== '/profile' && isAuth ? (
						<button
							aria-label='Go to profile'
							onClick={() => {
								navigate('/profile')
							}}
						>
							<SlUser fill='#fff' fontSize={25} />
						</button>
					) : (
						<button
							aria-label='Go back'
							onClick={() => {
								navigate(isAuth ? backLink : '/auth')
							}}
						>
							<IoMdArrowBack fill='#fff' fontSize={29} />
						</button>
					)}

					<Link to='/menu'>Menu</Link>

					<Link to='/news'>News</Link>

					<Link to='/contacts'>Contacts</Link>

					<>
						{role === 'admin' ? (
							<>
								<Link to='/admin-orders'>Orders</Link>

								<Link to='/promotions'>Promotions</Link>
							</>
						) : (
							<Link to='/orders'>Orders</Link>
						)}
					</>
					{role === 'user' ? (
						<>
							{showAlert && (
								<ShowAlert text={showAlert} hideAlert={hideAlert} />
							)}
							<Link to='/cart'>Cart</Link>
						</>
					) : null}
					<AiOutlineLogout onClick={logoutHandler} />
					{/* <button onClick={logoutHandler}>Logout</button> */}
				</>
			)}
		</header>
	)
}

export default Header
