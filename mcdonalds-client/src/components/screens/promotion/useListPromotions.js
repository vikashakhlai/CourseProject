import { useQuery } from '@tanstack/react-query'

import PromotionService from '../../../services/promotion/promotion.service'

export const useListPromotions = () =>
	useQuery(['list promotions'], () => PromotionService.getAll(), {
		select: ({ data }) => data
	})
