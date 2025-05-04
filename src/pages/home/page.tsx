import React, { useEffect } from 'react'
import { getDomains } from '../../core/redux/actions'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../core/redux/store'
import { Table } from 'antd'
import TableComponent from '../../components/Table/Table-component'

const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        // Get and save all domains from API
        dispatch(getDomains())
    }, [])



    return (
        <main className='bg-zinc-100 h-dvh flex items-center justify-center'>
            <section  className='md:max-w-6xl mx-auto container'>
                <h1>
                    Domain's management
                </h1>
                <div >
                    <TableComponent />
                </div>
            </section>
        </main>
    )
}

export default HomePage