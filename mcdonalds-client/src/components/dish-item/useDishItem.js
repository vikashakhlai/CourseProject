import { useQuery } from '@tanstack/react-query'

import DishService from '../../services/dish/dish.service'

export const getDishes = () => {
	return useQuery(['get dishes'], () => DishService.getAll(), {
		select: ({ data }) => data
	})
}
