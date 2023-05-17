import { $axios } from '../../api'

export const PROMOTIONS = '/promotions'

class PromotionService {
	async getAll() {
		return $axios.get(PROMOTIONS)
	}

	// name,descriptions
	async create(body) {
		return $axios.post(PROMOTIONS, body)
	}

	async update(id, body) {
		return $axios.put(`${PROMOTIONS}/${id}`, body)
	}

	async delete(id) {
		return $axios.delete(`${PROMOTIONS}/${id}`)
	}
}

export default new PromotionService()
