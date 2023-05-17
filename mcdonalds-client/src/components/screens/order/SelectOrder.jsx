import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

import Loader from '../../ui/Loader'

import { useListOrders } from './useListOrders'

const SelectOrder = ({ control }) => {
	const { data, isLoading } = useListOrders()

	if (isLoading) return <Loader />

	return (
		<Controller
			name='id'
			control={control}
			render={({ field: { value, onChange } }) => {
				return (
					<ReactSelect
						classNamePrefix='select2-selection'
						placeholder='Orders...'
						title='Orders'
						options={data.map(order => ({
							value: order.id,
							label: order.userId
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

export default SelectOrder
