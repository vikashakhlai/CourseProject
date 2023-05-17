import { Link } from 'react-router-dom'

import Loader from '../../ui/Loader'

import fastFood from '../../../../public/images/header/fast-food.png'
import news from '../../../../public/images/header/news.png'
import promotion from '../../../../public/images/header/promotion.png'
import Layout from '../../layout/Layout'
import stylesLayout from '../../layout/Layout.module.scss'
import PromotionItem from '../../promotion-item/PromotionItem'

import styles from './Profile.module.scss'
import { useProfile } from './useProfile'

const Profile = () => {
	const { data, isLoading } = useProfile()
	const role = data?.role
	return (
		<>
			{/* <Header /> */}
			<Layout>
				<div className={styles.center}>
					{isLoading ? (
						<Loader />
					) : (
						<>
							<h3 className={stylesLayout.heading}>User profile</h3>
							<p>Email: {data?.email}</p>
							<p>Role: {data?.role}</p>
							<br />
							{role === 'user' ? (
								<>
									<h3 className={stylesLayout.heading}>User promotions</h3>
									{data.promotions.length ? (
										data.promotions.map(promotion => (
											<PromotionItem key={promotion.id} promotion={promotion} />
										))
									) : (
										<p>There are no promotions</p>
									)}
								</>
							) : (
								<>
									<h3>Create pages:</h3>
									<Link to='/CourseProject/new-promotion'>
										<img className={styles.icon} src={promotion} />
									</Link>
									<Link to='/CourseProject/new-dish'>
										<img className={styles.icon} src={fastFood} />
									</Link>
									<Link to='/CourseProject/new-news'>
										<img className={styles.icon} src={news} />
									</Link>
								</>
							)}
						</>
					)}
				</div>
			</Layout>
		</>
	)
}

export default Profile
