import { Input } from 'antd'
import { HandPlatter, Search } from 'lucide-react'
import React, { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { search } from '../../core/redux/reducers/domains-reducer'

const SearchInput = () => {
  const dispatch = useDispatch()

  const handleChange = (value: string) => {
    dispatch(search(value))
  }

    
  return (
    <Input size='large' onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(event.target.value)
    }} prefix={<Search className='size-4 text-zinc-400 mr-1'/>} placeholder='Search ...' className='[&_>_.ant-input]:placeholder:!text-xs [&_>_.ant-input]:!text-sm !pb-2'/>
  )
}

export default SearchInput