import { $axios } from '../../api'

export const ORDERS = '/orders'

class OrderService {
	async getAll() {
		return $axios.get(ORDERS)
	}

	async getById(id) {
		return $axios.get(`${ORDERS}/${id}`)
	}

	// name,description,image
	async create(body) {
		return $axios.post(ORDERS, body, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	}

	async update(id, body) {
		return $axios.put(`${ORDERS}/${id}`, body, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	}

	async setCompleteOrder(id) {
		return $axios.patch(`${ORDERS}/${id}`)
	}

	async delete(id) {
		return $axios.delete(`${ORDERS}/${id}`)
	}
}

export default new OrderService()
