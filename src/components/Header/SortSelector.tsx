import { Select } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../core/redux/store'
import { SortsType } from '../../core/types/types'
import { sortItems } from '../../core/redux/reducers/domains-reducer'

const SortSelector = () => {
    const dispatch = useDispatch<AppDispatch>()

        // Sort ObjectType
        type OptionType = {
            value: SortsType,
            label: string
        }
    
        // Sort Options
        const options: OptionType[] = [
            { value: "DEFAULT_SORT", "label": "Default" },
            { value: 'BY_ASC', label: 'Order by Ascending' },
            { value: 'BY_DESC', label: 'Order by Descending' },
            { value: "BY_ACTIVATION", label: "Order by Active" },
            { value: "BY_STATUS", label: "Order by Status" },
        ];


    return (
        <Select
            defaultValue="DEFAULT_SORT"
            options={options}
            onChange={(value: SortsType) => {
                dispatch(sortItems(value))
            }}
            size="large"
            className="[&_>_.ant-select-selector]:!pr-6 min-w-[200px]"
        />
    )
}

export default SortSelector