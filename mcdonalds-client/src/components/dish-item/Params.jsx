import styles from './DishItem.module.scss'

const Params = ({ weight, calories, description }) => {
	return (
		<div className={styles.container}>
			<p>{description}</p>
			<span>{weight} g.</span>
			<span>{calories} cal.</span>
		</div>
	)
}

export default Params
