import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

import Loader from '../../ui/Loader'

import { useListUsers } from './useListUsers.js'

const SelectUsers = ({ control }) => {
	const { data, isLoading } = useListUsers()

	if (isLoading) return <Loader />

	return (
		<Controller
			name='userIds'
			control={control}
			render={({ field: { value, onChange } }) => {
				return (
					<ReactSelect
						classNamePrefix='select2-selection'
						placeholder='Users...'
						title='Users'
						options={data.map(user => ({
							value: user.id,
							label: user.email
						}))}
						value={value}
						onChange={onChange}
						isMulti
					/>
				)
			}}
		/>
	)
}

export default SelectUsers
