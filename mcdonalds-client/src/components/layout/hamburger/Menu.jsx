import cn from 'clsx'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../../hooks/useAuth'

import { TOKEN } from '../../../app.constants'

import styles from './Hamburger.module.scss'
import { menu } from './menu.data'

const Menu = ({ isShow, setIsShow }) => {
	const { setIsAuth } = useAuth()

	const navigate = useNavigate()

	const logoutHandler = () => {
		// Cookies.remove(TOKEN)
		localStorage.removeItem(TOKEN)
		// Cookies.remove(TOKEN)
		setIsAuth(false)
		setIsShow(false)

		navigate('/CourseProject/auth')
	}

	return (
		<nav
			className={cn(styles.menu, {
				[styles.show]: isShow
			})}
		>
			<ul>
				{menu.map((item, index) => (
					<li key={`_menu_${index}`}>
						<Link to={'/CourseProject' + item.link}>{item.title}</Link>
					</li>
				))}
				<li>
					<button onClick={logoutHandler}>Logout</button>
				</li>
			</ul>
		</nav>
	)
}

export default Menu
