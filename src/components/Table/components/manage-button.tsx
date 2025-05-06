import { EllipsisVertical } from 'lucide-react'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dropdown, MenuProps, message } from 'antd'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../core/redux/store'
import { getDomains, removeDomain, updateDomain } from '../../../core/redux/actions'
import { DomainType } from '../../../core/types/types'
import useDrawer from '../../../core/hooks/use-drawer'
import EditDomainDrawer from '../../Drawer/EditDomainDrawer'
import { useToast } from '../../../core/hooks/use-toast'

export const ManageButton = ({ domain }: { domain: DomainType }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const messageApi = useToast()
    const dispatch = useDispatch<AppDispatch>()
    const { openDrawer } = useDrawer()

    const isVerified = domain.status == "verified"

    const items: MenuProps['items'] = [
        {
            key: "1",
            label: "View pages",
            className: "!font-medium",
            disabled: true,
            onClick: () => { }

        },
        {
            key: "2",
            label: isVerified ? "Reject" : "Verify",
            disabled: false,
            danger: isVerified ? true : false,
            className: "!font-medium",
            onClick: async () => {
                const hideMessage = messageApi.loading("Verifying the domain ..", 0)

                const res = await dispatch(updateDomain({
                    status: isVerified ? "rejected" : "verified",
                    id: String(domain.id),
                }))

                const result: any = res.payload

                if (result.status == 200) {
                    hideMessage()
                    messageApi.success("Domain verified successfully")
                } else {
                    hideMessage()
                    messageApi.error("Failed to verify the domain")
                }
            }
        },
        {
            key: "3",
            label: "Edit",
            className: "!font-medium",
            onClick: () => {
                openDrawer(<EditDomainDrawer domain={domain} />)
            }
        },
        {
            key: "4",
            label: "Delete",
            disabled: false,
            danger: true,
            onClick: async () => {
                const hideMessage = messageApi.loading("Removing domain, please wait...", 0)

                try {
                    const request = await dispatch(removeDomain(String(domain.id)))
                    const Response = request.payload

                    if (Response.status == 400) {
                        hideMessage()
                        messageApi.error(Response.message)
                        return false
                    }
                    messageApi.success("Domain removed successfully !")
                    hideMessage()

                } catch (error: any) {
                    console.log(error)
                    messageApi.error(error.message)
                }

            }

        }
    ]

    return (
        <>
            <div className='relative'>
                <button className='cursor-pointer' onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen)
                }}>
                    <EllipsisVertical className='size-4 cursor-pointer text-zinc-400' />
                </button>
                <AnimatePresence>
                    {isDropdownOpen && <Dropdown open={isDropdownOpen} onOpenChange={setIsDropdownOpen} className='!font-bold' menu={{ items }} placement='bottomLeft' />}
                </AnimatePresence>
            </div>
        </>
    )
}
