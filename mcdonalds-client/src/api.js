import axios from 'axios'

import { TOKEN } from './app.constants'

const API_URL = `${import.meta.env.VITE_SERVER_URL}/api`

// export const $axios = axios.create({
// 	baseURL: API_URL,
// 	headers: {
// 		'Content-Type': 'application/json',
// 		Authorization: Cookies.get(TOKEN) ? `Bearer ${Cookies.get(TOKEN)}` : ''
// 	}
// })

export const $axios = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
		Authorization: localStorage.getItem(TOKEN)
			? `Bearer ${localStorage.getItem(TOKEN)}`
			: ''
	}
})
