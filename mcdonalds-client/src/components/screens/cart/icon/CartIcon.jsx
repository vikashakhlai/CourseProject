import { FiShoppingCart } from 'react-icons/fi'

const CartIcon = props => {
	return (
		<div className='cart-icon' onClick={props.toggleShow}>
			<FiShoppingCart />
			{/* <i>shopping_cart</i> */}
			{props.length ? <span>{props.length}</span> : null}
		</div>
	)
}

export default CartIcon
