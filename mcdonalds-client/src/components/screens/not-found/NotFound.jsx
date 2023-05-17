import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../../hooks/useAuth'

const NotFound = () => {
	const { isAuth } = useAuth()

	const navigate = useNavigate()

	useEffect(() => {
		if (!isAuth) {
			navigate('/auth')
		}
	}, [])

	return (
		<>
			{/* <Layout heading='Page not found' /> */}
			{/* <div className='wrapper-inner-page'>404 page not found</div> */}

			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					textAlign: 'center'
				}}
			>
				<img src='/public/happy.png' alt='' />
			</div>
		</>
	)
}

export default NotFound
