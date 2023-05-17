import { Link } from 'react-router-dom'

import Loader from '../../ui/Loader'

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
									<h3 className={stylesLayout.heading}>User promotions</h3>)
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
									<Link to='/new-promotion'>
										<img
											className={styles.icon}
											src='/public/images/header/promotion.png'
										/>
									</Link>
									<Link to='/new-dish'>
										<img
											className={styles.icon}
											src='/public/images/header/fast-food.png'
										/>
									</Link>
									<Link to='/new-news'>
										<img
											className={styles.icon}
											src='/public/images/header/news.png'
										/>
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
