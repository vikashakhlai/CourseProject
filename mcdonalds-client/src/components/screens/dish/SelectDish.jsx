import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

import Loader from '../../ui/Loader'

import { useListDishes } from './useListDishes.js'

const SelectDish = ({ control }) => {
	const { data, isLoading } = useListDishes()

	if (isLoading) return <Loader />

	return (
		<Controller
			name='id'
			control={control}
			render={({ field: { value, onChange } }) => {
				return (
					<ReactSelect
						classNamePrefix='select2-selection'
						placeholder='Dishes...'
						title='Dishes'
						options={data.map(dish => ({
							value: dish.id,
							label: dish.name
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

export default SelectDish
