import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

import Loader from '../../ui/Loader'

import { useListNews } from './useListNews'

const SelectNews = ({ control }) => {
	const { data, isLoading } = useListNews()

	if (isLoading) return <Loader />

	return (
		<Controller
			name='id'
			control={control}
			render={({ field: { value, onChange } }) => {
				return (
					<ReactSelect
						classNamePrefix='select2-selection'
						placeholder='News...'
						title='News'
						options={data.map(news => ({
							value: news.id,
							label: news.name
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

export default SelectNews
