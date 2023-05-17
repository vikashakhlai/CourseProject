import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import PromotionService from '../../../services/promotion/promotion.service'

export const useNewPromotion = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control
	} = useForm({
		mode: 'onChange'
	})

	const { isSuccess, error, isLoading, mutate } = useMutation(
		['create promotion'],
		body => PromotionService.create(body),
		{
			onSuccess: () => {
				reset({
					name: '',
					description: '',
					userIds: []
				})
			}
		}
	)

	const onSubmit = data => {
		try {
			mutate({
				name: data.name,
				description: data.description,
				userIds: data.userIds.map(us => us.value)
			})
		} catch (err) {
			alert('Error data. Please check fields')
		}
	}

	return useMemo(
		() => ({
			register,
			handleSubmit,
			errors,
			control,
			isSuccess,
			error,
			isLoading,
			onSubmit
		}),
		[errors, isSuccess, error, isLoading]
	)
}
