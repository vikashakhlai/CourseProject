import { useState } from 'react'
import { Link } from 'react-router-dom'

import Cost from './Cost'
import styles from './DishItem.module.scss'

const DishItem = ({ dish, readMore = '' }) => {
	const [count, setCount] = useState(0)
	return (
		<div key={dish.id} className={styles.item}>
			<div className={styles.image}>
				<img src={import.meta.env.VITE_SERVER_URL + dish.images}></img>
			</div>

			<div className={styles.info}>
				<h2>{dish.name}</h2>

				<Cost cost={dish.cost} />

				{/* <Params weight={dish.weight} calories={dish.calories} /> */}
				<Link to={`/dishes/${dish.id}`}>{readMore}</Link>
			</div>
		</div>
	)
}

export default DishItem
