import cn from 'clsx'

import styles from './CartButton.module.scss'

const CartButton = ({ children, clickHandler = null, size = 'm' }) => {
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

export default CartButton
