import { EllipsisVertical } from 'lucide-react'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dropdown, MenuProps } from 'antd'

export const ManageButton = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const items: MenuProps['items'] = [
        {
            key: "1",
            label: "View pages",
            className: "!font-medium",
            disabled: true,
            onClick: () => {}

        },
        {
            key: "2",
            label: "Verify",
            disabled: false,
            className: "!font-medium",
            onClick: () => {},
        },
        {
            key: "3",
            label: "Install Script",
            disabled: true,
            className: "!font-medium",
            onClick: () => {}

        },
        {
            key: "4",
            label: "Delete",
            disabled: false,
            className: "!text-red-500 !font-medium",
            onClick: () => {}
        }
    ]

    return (
        <div className='relative'>
            <button className='cursor-pointer' onClick={() => {
                setIsDropdownOpen(!isDropdownOpen)
            }}>
                <EllipsisVertical className='size-4 cursor-pointer text-zinc-400' />
            </button>
            <AnimatePresence>
                {isDropdownOpen && <Dropdown  open={isDropdownOpen} onOpenChange={setIsDropdownOpen} className='!font-bold'  menu={{ items }} placement='bottomLeft' />}
            </AnimatePresence>
        </div>
    )
}
