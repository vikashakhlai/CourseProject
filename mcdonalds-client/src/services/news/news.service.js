import { $axios } from '../../api'

export const NEWS = '/news'

class NewsService {
	async getAll() {
		return $axios.get(NEWS)
	}

	async getById(id) {
		return $axios.get(`${NEWS}/${id}`)
	}

	// name,description,image
	async create(body) {
		return $axios.post(NEWS, body, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	}

	async update(id, body) {
		return $axios.put(`${NEWS}/${id}`, body, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	}

	async delete(id) {
		return $axios.delete(`${NEWS}/${id}`)
	}
}

export default new NewsService()
