import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import store from '../redux/store'
import LoadingProvider from './loading-provider'

export const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            <LoadingProvider>
                {children}
            </LoadingProvider>
        </Provider>
    )
}
