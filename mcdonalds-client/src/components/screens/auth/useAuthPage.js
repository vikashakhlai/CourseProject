import { useMutation } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../../hooks/useAuth'

import AuthService from '../../../services/auth.service'

export const useAuthPage = () => {
	const [type, setType] = useState('login')

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({
		mode: 'onChange'
	})

	const { isAuth, setIsAuth } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (isAuth) {
			navigate('/CourseProject/')
			location.reload()
		}
	}, [isAuth])

	const { mutate, isLoading } = useMutation(
		['auth'],
		({ email, password }) =>
			AuthService.main(email, password, type).catch(err => {
				alert(err)
			}),
		{
			onSuccess: () => {
				setIsAuth(true)
				reset()
			}
		}
	)

	const onSubmit = data => {
		try {
			mutate(data)
		} catch (err) {
			alert('Error data. Please check fields')
		}
	}

	return useMemo(
		() => ({
			setType,
			register,
			handleSubmit,
			errors,
			isLoading,
			onSubmit
		}),
		[errors, isLoading]
	)
}
