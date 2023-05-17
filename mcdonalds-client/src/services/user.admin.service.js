import { $axios } from '../api'

const USERS = '/users'

class UserAdminService {
	async getAll() {
		return $axios.get(`${USERS}`)
	}
}

export default new UserAdminService()
