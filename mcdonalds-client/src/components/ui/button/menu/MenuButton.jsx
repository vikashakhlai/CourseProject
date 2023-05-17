import cn from 'clsx'

import styles from './MenuButton.module.scss'

const MenuButton = ({ children, clickHandler = null, size = 'xl' }) => {
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

export default MenuButton
