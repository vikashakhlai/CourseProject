import { useQuery } from '@tanstack/react-query'

import UserAdminService from '../../../services/user.admin.service'

export const useListUsers = () =>
	useQuery(['list users'], () => UserAdminService.getAll(), {
		select: ({ data }) => data
	})
