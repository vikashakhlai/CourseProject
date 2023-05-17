const PromotionItem = ({ promotion }) => {
	return (
		<div key={promotion.id}>
			<p>{promotion.name}</p>
			<p>{promotion.description}</p>
		</div>
	)
}

export default PromotionItem
