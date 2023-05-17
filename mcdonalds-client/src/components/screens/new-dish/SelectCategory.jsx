import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

const SelectCategory = ({ control }) => {
	const data = ['burger', 'drinks', 'dessert']

	return (
		<Controller
			name='category'
			control={control}
			render={({ field: { value, onChange } }) => {
				return (
					<ReactSelect
						// defaultInputValue='burger'
						defaultValue={!null}
						classNamePrefix='select2-selection'
						placeholder='Categories...'
						title='Categories'
						options={data.map(category => ({
							value: category,
							label: category
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

export default SelectCategory
