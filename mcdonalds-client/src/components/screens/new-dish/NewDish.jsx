import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import Loader from '../../ui/Loader'
import Alert from '../../ui/alert/Alert'
import Button from '../../ui/button/Button'
import Field from '../../ui/field/Field'

import { useAdmin } from '../../../hooks/useAdmin'

import { socket } from '../../../../socket'
import DishService from '../../../services/dish/dish.service'
import Layout from '../../layout/Layout'
import NotFound from '../not-found/NotFound'

import styles from './NewDish.module.scss'
import SelectCategory from './SelectCategory'

const NewDish = () => {
	// const data = ['burger', 'drink', 'dessert']
	const { data } = useAdmin()
	const role = data?.role

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
		['create dish'],
		body => DishService.create(body),
		{
			onSuccess: () => {
				reset()
			}
		}
	)

	const onSubmit = data => {
		try {
			const formData = new FormData()
			formData.append('name', data.name)
			formData.append('description', data.description)
			formData.append('category', data.category.value)
			formData.append('cost', data.cost)
			formData.append('calories', data.calories)
			formData.append('weight', data.weight)
			formData.append('images', data.images.item(0))
			socket.emit('NewDish')
			mutate(formData)
		} catch (err) {
			alert(err.message)
		}
	}

	return (
		<>
			{role === 'admin' ? (
				<>
					<Layout>
						<h2 className={styles.header}>Create dish</h2>
						<div className='wrapper-inner-page'>
							{error && <Alert type='error' text={error} />}
							{isSuccess && <Alert text='Dishes created' />}
							{isLoading && <Loader />}

							<form onSubmit={handleSubmit(onSubmit)}>
								<Field
									error={errors?.name?.message}
									name='name'
									register={register}
									options={{
										required: 'Name is required'
									}}
									type='text'
									placeholder='Enter name'
								/>
								<Field
									error={errors?.description?.message}
									name='description'
									register={register}
									options={{
										required: 'Description is required'
									}}
									placeholder='Enter description'
								/>
								<SelectCategory control={control} />
								{/* <Field
						error={errors?.category?.message}
						name='category'
						register={register}
						options={{
							required: 'Category is required'
						}}
						placeholder='Enter category'
					/> */}
								<Field
									error={errors?.cost?.message}
									name='cost'
									register={register}
									options={{
										required: 'Cost is required'
									}}
									placeholder='Enter cost'
									type='number'
								/>
								<Field
									error={errors?.calories?.message}
									name='calories'
									register={register}
									options={{
										required: 'Calories is required'
									}}
									placeholder='Enter calories'
									type='number'
								/>
								<Field
									error={errors?.weight?.message}
									name='weight'
									register={register}
									options={{
										required: 'Weight is required'
									}}
									placeholder='Enter weight'
									type='number'
								/>
								<Field
									error={errors?.images?.message}
									name='images'
									register={register}
									options={{
										required: 'Images is required'
									}}
									type='file'
									placeholder='Enter image'
								/>
								{errors?.iconPath && (
									<div className='error'>{errors?.iconPath?.message}</div>
								)}
								<Button>Create</Button>
							</form>
						</div>
					</Layout>
				</>
			) : (
				<NotFound />
			)}
		</>
	)
}

export default NewDish
