import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import Loader from '../../ui/Loader'
import Alert from '../../ui/alert/Alert'
import Button from '../../ui/button/Button'
import Field from '../../ui/field/Field'

import { useAdmin } from '../../../hooks/useAdmin'

import NewsService from '../../../services/news/news.service'
import Layout from '../../layout/Layout'
import NotFound from '../not-found/NotFound'

import styles from './NewNews.module.scss'

const NewNews = () => {
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
		['create news'],
		body => NewsService.create(body),
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
			formData.append('image', data.image.item(0))

			mutate(formData)
		} catch (err) {
			alert('Error data. Please check fields')
		}
	}

	const { data } = useAdmin()
	const role = data?.role

	//name,description,images

	return (
		<>
			{role === 'admin' ? (
				<>
					<Layout>
						<h2 className={styles.header}>Create new news</h2>
						<div className='wrapper-inner-page'>
							{error && <Alert type='error' text={error} />}
							{isSuccess && <Alert text='News created' />}
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

								<Field
									error={errors?.image?.message}
									name='image'
									register={register}
									options={{
										required: 'Images is required'
									}}
									type='file'
								/>

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

export default NewNews
