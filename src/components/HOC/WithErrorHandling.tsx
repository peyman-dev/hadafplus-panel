import React, { ReactNode } from 'react'

const WithErrorHandling = ({ children, message }: { children: ReactNode, message?: (string | null | undefined) }) => {
    return (
        <>

            {children}
            {message ?
                <p className='text-sm text-red-600 font-medium mt-2'>
                    * {message}
                </p>
                : null
            }
        </>
    )
}

export default WithErrorHandling