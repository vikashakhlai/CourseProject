import { useQuery } from '@tanstack/react-query'

import DishService from '../../../services/dish/dish.service'

export const useListDishes = () =>
	useQuery(['list dishes'], () => DishService.getAll(), {
		select: ({ data }) => data
	})
