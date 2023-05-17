import cn from 'clsx'

import styles from './ItemsButton.module.scss'

const ItemsButton = ({ children, clickHandler = null, size = 'xl' }) => {
	return (
		<div className={styles.wrapper}>
			<button
				className={cn(styles.button, styles[size])}
				onClick={clickHandler}
			>
				{children}
			</button>
		</div>
	)
}

export default ItemsButton
