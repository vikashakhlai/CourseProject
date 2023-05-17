import { useEffect, useState } from 'react'

import ItemsButton from '../../ui/button/items/ItemsButton.jsx'

import { useAdmin } from '../../../hooks/useAdmin.js'

import { $axios } from '../../../api.js'
import PromotionService from '../../../services/promotion/promotion.service.js'
import Layout from '../../layout/Layout.jsx'
import PromotionItem from '../../promotion-item/PromotionItem'
import NotFound from '../not-found/NotFound.jsx'

const Promotion = () => {
	const [promotions, setPromotions] = useState([])
	const { data } = useAdmin()
	const role = data?.role

	useEffect(() => {
		const fetchData = async () => {
			const data = await PromotionService.getAll()
			setPromotions(data.data)
		}

		fetchData()
	}, [])

	const deletePromotion = id => {
		return $axios.delete(`/promotions/${id}`).then(() => {
			setPromotions(promotions.filter(el => el.id !== id))
		})
	}

	return (
		<Layout>
			<>
				<h2 style={{ textAlign: 'center', fontSize: '40px' }}>Promotions</h2>
				{role === 'admin' ? (
					<div style={{ textAlign: 'center' }}>
						{promotions.length ? (
							promotions.map(promotion => (
								<>
									<PromotionItem key={promotion.id} promotion={promotion} />
									{role === 'admin' ? (
										<ItemsButton
											clickHandler={() => deletePromotion(promotion.id)}
										>
											Delete promotion
										</ItemsButton>
									) : null}
								</>
							))
						) : (
							<p style={{ textAlign: 'left' }}>There are no promotions</p>
						)}
					</div>
				) : (
					<NotFound />
				)}
			</>
		</Layout>
	)

	// return (

	// )
}

export default Promotion
