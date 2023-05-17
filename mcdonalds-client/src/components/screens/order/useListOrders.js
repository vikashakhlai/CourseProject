import { useQuery } from '@tanstack/react-query'

import OrderService from '../../../services/order/order.service'

export const useListOrders = () =>
	useQuery(['list orders'], () => OrderService.getAll(), {
		select: ({ data }) => data
	})
