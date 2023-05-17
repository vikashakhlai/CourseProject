import { FiTrash2 } from 'react-icons/fi'
const CartItem = props => {
	return (
		<tr>
			<td onClick={() => props.minus(props)}>-</td>
			<td>{props.quantity}</td>
			<td onClick={() => props.plus(props)}>+</td>
			<td>{props.name}</td>
			<td>{props.cost}</td>
			<td>{props.calories}</td>
			<td>{props.cost * props.quantity}</td>
			<td>
				{/* <i
					className='material-icons cart-item-delete'
					onClick={() => props.removeFromCart(props.id)}
				>
					close
				</i> */}
				<FiTrash2 onClick={() => props.removeFromCart(props.id)} />
			</td>
		</tr>
	)
}

export default CartItem
