import React, { useEffect } from 'react'
import { getDomains } from '../../core/redux/actions'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../core/redux/store'
import { Table } from 'antd'
import TableComponent from '../../components/Table/Table-component'
import { HeaderSection } from '../../components/HeaderSection'

const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        // Get and save all domains from API
        dispatch(getDomains())
    }, [])



    return (
        <main className='bg-zinc-100 h-dvh flex items-center justify-center'>
            <section className='md:max-w-6xl space-y-10 mx-auto container'>
                <HeaderSection />
                <TableComponent />
            </section>
        </main>
    )
}

export default HomePage