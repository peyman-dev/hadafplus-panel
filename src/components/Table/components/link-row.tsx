import { SquareArrowOutUpRight } from 'lucide-react'
import React from 'react'
import { StatusType } from '../../../core/types/types'

type DomainPropsType = {
    link: string,
    status: {
        isActive: boolean,
        status: StatusType
    }
}

export const LinkRow = ({ link, status: {
    isActive = false,
    status = "pending"
} }: DomainPropsType) => {


    // is Active and verified circle color ..
    const statusClassname = isActive ? "bg-green-500" : "bg-red-500"


    return (
        <a href={link} target='_blank' className='flex font-medium !text-zinc-800 items-center gap-2'>
            <div className={`size-2 rounded-full ${String(statusClassname)}`} />
            <span>
                {link}
            </span>
            <SquareArrowOutUpRight className='size-3 text-zinc-400' />
        </a>
    )
}
