import { useQuery } from '@tanstack/react-query'

import UserService from '../services/user.service'

export const useAdmin = () => {
	return useQuery(['get role'], () => UserService.getRole(), {
		select: ({ data }) => data
	})
}
