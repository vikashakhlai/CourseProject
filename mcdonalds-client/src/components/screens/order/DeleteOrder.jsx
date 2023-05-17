import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'

import Loader from '../../ui/Loader'
import Alert from '../../ui/alert/Alert'
import Button from '../../ui/button/Button'

import { useAdmin } from '../../../hooks/useAdmin'

import OrderService from '../../../services/order/order.service'
import Layout from '../../layout/Layout'
import NotFound from '../not-found/NotFound'

import SelectOrder from './SelectOrder'

const DeleteOrder = () => {
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
		['delete order'],
		id => OrderService.delete(id),
		{
			onSuccess: () => {
				// reset({
				// 	id: []
				// })
				reset()
			}
		}
	)

	const { data } = useAdmin()
	const role = data?.role

	const onSubmit = data => {
		mutate(Number(data.id.value))
	}

	return (
		<>
			{role === 'admin' ? (
				<>
					<Layout heading='Delete order' />
					<div className='wrapper-inner-page'>
						{error && <Alert type='error' text={error} />}
						{isSuccess && <Alert text='News deleted' />}
						{isLoading && <Loader />}
						<form onSubmit={handleSubmit(onSubmit)}>
							<SelectOrder control={control} />

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

export default DeleteOrder
