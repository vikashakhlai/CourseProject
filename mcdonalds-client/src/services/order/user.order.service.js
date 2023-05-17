import { $axios } from '../../api'

const ORDERS = `users/orders`

class UserOrderService {
	async getAll() {
		return $axios.get(`/${ORDERS}`)
	}

	async create(body) {
		return $axios.post(DISHES, body)
	}
}

export default new UserOrderService()
