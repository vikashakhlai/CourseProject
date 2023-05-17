import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'

import Loader from '../../ui/Loader'
import Alert from '../../ui/alert/Alert'
import Button from '../../ui/button/Button'

import PromotionService from '../../../services/promotion/promotion.service'
import Layout from '../../layout/Layout'

import SelectPromotion from './SelectPromotion'

const DeletePromotion = () => {
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
		['delete news'],
		id => PromotionService.delete(id),
		{
			onSuccess: () => {
				reset({
					id: []
				})
			}
		}
	)

	const onSubmit = data => {
		mutate(Number(data.id.value))
	}

	return (
		<>
			<Layout heading='Delete promotion' />
			<div className='wrapper-inner-page'>
				{error && <Alert type='error' text={error} />}
				{isSuccess && <Alert text='Promotion deleted' />}
				{isLoading && <Loader />}
				<form onSubmit={handleSubmit(onSubmit)}>
					<SelectPromotion control={control} />

					<Button>Delete</Button>
				</form>
			</div>
		</>
	)
}

export default DeletePromotion
