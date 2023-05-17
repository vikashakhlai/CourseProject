import { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'

import Loader from '../../ui/Loader'

import DishService from '../../../services/dish/dish.service'
import DishItem from '../../dish-item/DishItem'
import Params from '../../dish-item/Params'
import Layout from '../../layout/Layout'

import styles from './DIshDetail.module.scss'

const DishDetail = () => {
	const { id } = useParams()
	const [dish, setDish] = useState({})
	useEffect(() => {
		if (!id) return

		const fetchData = async () => {
			const data = await DishService.getById(id)

			setDish(data.data)
		}

		fetchData()
	}, [id])

	if (!dish?.name) return <Loader />

	return (
		<Layout>
			<div>
				<div
					style={{ display: 'flex', flexDirection: 'column', width: '360px' }}
					className={styles.item}
				>
					<Link className={styles.back} to='/menu'>
						<FiX></FiX>
					</Link>
					<DishItem dish={dish} />
					<div className={styles.params}>
						<Params
							weight={dish.weight}
							calories={dish.calories}
							description={dish.description}
						/>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default DishDetail
