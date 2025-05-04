import React, { ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Loading } from '../../components/loading'

const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true)
    const store = useSelector((store: any) => store.domains)

    useEffect(() => {
        setIsLoading(store.loading)
    },[store.loading])
    
    return ( 
        <>
        {
            isLoading ? <Loading /> : null
        }
        {children}
        </>
    )
}

export default LoadingProvider