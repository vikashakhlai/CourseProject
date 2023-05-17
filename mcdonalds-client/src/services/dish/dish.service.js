import { $axios } from '../../api'

export const DISHES = '/dishes'

class DishService {
	async getAll() {
		return $axios.get(DISHES)
	}

	async getById(id) {
		return $axios.get(`${DISHES}/${id}`)
	}

	// name,images,category,description,cost,weight
	async create(body) {
		return $axios.post(DISHES, body, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	}

	async update(id, body) {
		return $axios.put(`${DISHES}/${id}`, body)
	}

	async delete(id) {
		return $axios.delete(`${DISHES}/${id}`)
	}
}

export default new DishService()
