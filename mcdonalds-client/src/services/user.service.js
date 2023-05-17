import { $axios } from '../api'

const USERS = '/users'

class UserService {
	async getProfile() {
		return $axios.get(`${USERS}/profile`)
	}
	async getOrders() {
		return $axios.get(`${USERS}/orders`)
	}
	async getRole() {
		return $axios.get(`${USERS}/role`)
	}
}

export default new UserService()
