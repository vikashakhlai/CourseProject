const PromotionItem = ({ promotion }) => {
	return (
		<div key={promotion.id}>
			<div>
				<img src={import.meta.env.VITE_SERVER_URL + promotion.images} />
			</div>

			<p>{promotion.name}</p>
			<p>{promotion.description}</p>
		</div>
	)
}

export default PromotionItem
