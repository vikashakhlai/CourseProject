const Cost = ({ cost }) => {
	return (
		<p>
			{new Intl.NumberFormat('ru-RU', {
				style: 'currency',
				currency: 'USD'
			}).format(cost)}
		</p>
	)
}

export default Cost
