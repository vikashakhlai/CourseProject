import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

import Loader from '../../ui/Loader'

import { useListPromotions } from './useListPromotions.js'

const SelectPromotion = ({ control }) => {
	const { data, isLoading } = useListPromotions()

	if (isLoading) return <Loader />

	return (
		<Controller
			name='id'
			control={control}
			render={({ field: { value, onChange } }) => {
				return (
					<ReactSelect
						classNamePrefix='select2-selection'
						placeholder='Promotions...'
						title='Promotions'
						options={data.map(promotion => ({
							value: promotion.id,
							label: promotion.name
						}))}
						value={value}
						onChange={onChange}
						isSingle
					/>
				)
			}}
		/>
	)
}

export default SelectPromotion
