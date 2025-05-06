import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import store from '../redux/store'
import LoadingProvider from './loading-provider'
import { DrawerProvider } from '../hooks/use-drawer'
import { ToastProvider } from '../hooks/use-toast'

export const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <ToastProvider>
                <Provider store={store}>
                    <DrawerProvider>
                        <LoadingProvider>
                            {children}
                        </LoadingProvider>
                    </DrawerProvider>
                </Provider>
            </ToastProvider>
        </>
    )
}
