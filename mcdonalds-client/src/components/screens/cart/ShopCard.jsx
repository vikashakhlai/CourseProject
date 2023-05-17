import { Link } from 'react-router-dom'

import MenuButton from '../../ui/button/menu/MenuButton'

import { useAdmin } from '../../../hooks/useAdmin'

import styles from './Cart.module.scss'

const ShopCard = props => {
	const { id, name, cost, calories, images, appendToCart, deleteDish } = props
	const item = { id: id, name: name, calories: calories, cost: cost }

	const { data } = useAdmin()
	const role = data?.role

	return (
		<div id={'product-' + id} className='card'>
			<div className='card-image waves-effect waves-block waves-light'>
				<Link to={`/CourseProject/dishes/${id}`}>
					<div className={styles.cartImage}>
						<img
							className='activator'
							src={import.meta.env.VITE_SERVER_URL + images}
							alt=''
						/>
					</div>
				</Link>
			</div>
			<div className='card-content'>
				<h3 className='card-title activator grey-text text-darken-4'>{name}</h3>
				<p className={styles.price}>{cost} $.</p>
			</div>
			<div className='card-action'>
				<div className={styles.buttons}>
					{role === 'admin' ? (
						<MenuButton clickHandler={() => deleteDish(id)}>
							Delete dish
						</MenuButton>
					) : (
						<>
							<MenuButton clickHandler={() => appendToCart(item, 1)}>
								Add to cart
							</MenuButton>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default ShopCard
