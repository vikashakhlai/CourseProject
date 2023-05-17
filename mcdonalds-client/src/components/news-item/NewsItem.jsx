import { useAdmin } from '../../hooks/useAdmin'

import styles from './NewsItem.module.scss'

const NewsItem = ({ news }) => {
	const { data } = useAdmin()
	const role = data?.role

	return (
		<>
			<div className={styles.container} key={news.id}>
				<div>
					<img src={import.meta.env.VITE_SERVER_URL + news.image} />
				</div>
				<h3>{news.name}</h3>
				<p>{news.description}</p>
			</div>
		</>
	)
}

export default NewsItem
