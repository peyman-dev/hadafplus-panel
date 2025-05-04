import { SquareArrowOutUpRight } from 'lucide-react'
import React from 'react'

export const LinkRow = ({ link }: { link: string }) => {
    return (
        <a href={link} target='_blank' className='flex font-medium !text-zinc-800 items-center gap-2'>
            <span>
                {link}
            </span>
            <SquareArrowOutUpRight className='size-3 text-zinc-400'/>
        </a>
    )
}
