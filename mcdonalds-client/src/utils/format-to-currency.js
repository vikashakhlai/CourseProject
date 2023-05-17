export const formatToCurrency = price =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	}).format(price)
