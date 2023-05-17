import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'

import Loader from '../../ui/Loader'
import Alert from '../../ui/alert/Alert'
import Button from '../../ui/button/Button'

import { useAdmin } from '../../../hooks/useAdmin'

import DishService from '../../../services/dish/dish.service'
import Layout from '../../layout/Layout'
import NotFound from '../not-found/NotFound'

import SelectDish from './SelectDish'

const DeleteDish = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control
	} = useForm({
		mode: 'onChange'
	})

	const { data } = useAdmin()
	const role = data?.role

	const { isSuccess, error, isLoading, mutate } = useMutation(
		['delete news'],
		id => DishService.delete(id),
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
			{role === 'admin' ? (
				<>
					<Layout heading='Delete news' />
					<div className='wrapper-inner-page'>
						{error && <Alert type='error' text={error} />}
						{isSuccess && <Alert text='News deleted' />}
						{isLoading && <Loader />}
						<form onSubmit={handleSubmit(onSubmit)}>
							<SelectDish control={control} />

							<Button>Delete</Button>
						</form>
					</div>
				</>
			) : (
				<NotFound />
			)}
		</>
	)
}

export default DeleteDish
