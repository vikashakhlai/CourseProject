import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import Loader from '../../ui/Loader'
import Alert from '../../ui/alert/Alert'
import Button from '../../ui/button/Button'
import Field from '../../ui/field/Field'

import { $axios } from '../../../api'
import Layout from '../../layout/Layout'

import SelectNews from './SelectNews'

const UpdateNews = () => {
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
		['update news'],
		body =>
			$axios.put(`/news/${id}`, (id, body), {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}),
		{
			onSuccess: () => {
				reset()
			}
		}
	)

	const onSubmit = data => {
		const formData = new FormData()
		formData.append('name', data.name)
		formData.append('description', data.description)
		formData.append('image', data.image.item(0))
		console.log(data.image.item(0))
		mutate(Number(data.id.value), formData)
		// mutate(formData)
	}

	return (
		<>
			<Layout heading='Update news' />
			<div className='wrapper-inner-page'>
				{error && <Alert type='error' text={error} />}
				{isSuccess && <Alert text='News updated' />}
				{isLoading && <Loader />}
				<form onSubmit={handleSubmit(onSubmit)}>
					<SelectNews control={control} />

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

					<Field
						error={errors?.image?.message}
						name='image'
						register={register}
						options={{
							required: 'Images is required'
						}}
						type='file'
					/>

					<Button>Update</Button>
				</form>
			</div>
		</>
	)
}

export default UpdateNews
