import Loader from '../../ui/Loader'
import Alert from '../../ui/alert/Alert'
import Button from '../../ui/button/Button'
import Field from '../../ui/field/Field'

import { useAdmin } from '../../../hooks/useAdmin'

import Layout from '../../layout/Layout'
import NotFound from '../not-found/NotFound'

import SelectUsers from './SelectUsers'
import { useNewPromotion } from './useNewPromotion.js'

const NewPromotion = () => {
	const {
		control,
		error,
		errors,
		handleSubmit,
		isLoading,
		isSuccess,
		onSubmit,
		register
	} = useNewPromotion()

	const { data } = useAdmin()
	const role = data?.role

	return (
		<>
			{role === 'admin' ? (
				<>
					<Layout>
						<h2>Create promotion</h2>
						<div className='wrapper-inner-page'>
							{error && <Alert type='error' text={error} />}
							{isSuccess && <Alert text='Promotion created successfully' />}
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

								<SelectUsers control={control} />

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

export default NewPromotion
