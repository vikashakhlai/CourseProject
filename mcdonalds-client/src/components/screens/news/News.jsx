import { useEffect, useState } from 'react'
import { TfiTrash } from 'react-icons/tfi'

import { useAdmin } from '../../../hooks/useAdmin'

import { $axios } from '../../../api'
import NewsService from '../../../services/news/news.service'
import Layout from '../../layout/Layout'
import NewsItem from '../../news-item/NewsItem'

import styles from './News.module.scss'

const News = () => {
	const [news, setNews] = useState([])
	const { data } = useAdmin()
	const role = data?.role

	useEffect(() => {
		const fetchData = async () => {
			const data = await NewsService.getAll()
			setNews(data.data)
		}

		fetchData()
	}, [])

	const deleteNews = id => {
		return $axios.delete(`/news/${id}`).then(() => {
			setNews(news.filter(el => el.id !== id))
		})
	}

	return (
		<div>
			<Layout>
				<h1 className={styles.header}>News</h1>
				{news.length ? (
					news.map(item => (
						<>
							<NewsItem key={item.id} news={item} />
							{role === 'admin' ? (
								<div style={{ textAlign: 'center' }}>
									<TfiTrash
										className={styles.trash}
										onClick={() => deleteNews(item.id)}
									/>
								</div>
							) : null}
						</>
					))
				) : (
					<p>There are no news</p>
				)}
			</Layout>
		</div>
	)
}

export default News
