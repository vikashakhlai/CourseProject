import { useQuery } from '@tanstack/react-query'

import NewsService from '../../../services/news/news.service'

export const useListNews = () =>
	useQuery(['list news'], () => NewsService.getAll(), {
		select: ({ data }) => data
	})
