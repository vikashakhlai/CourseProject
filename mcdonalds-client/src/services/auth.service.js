import { $axios } from '../api'
import { TOKEN } from '../app.constants'

class AuthService {
	async main(email, password, type) {
		try {
			const { data } = await $axios.post(
				`/auth/${type}`,
				{
					email,
					password
				}
				// {
				// 	withCredentials: true,
				// 	credentials: 'include'
				// }
			)

			if (data.token) {
				// Cookies.set(TOKEN, data.token)
				localStorage.setItem(TOKEN, data.token)
			}
			return data
		} catch (error) {
			throw new Error(error)
		}
	}
}

export default new AuthService()
