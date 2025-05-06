import { Button } from 'antd'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import useDrawer from '../../core/hooks/use-drawer'
import AddDomainUI from '../Drawer/AddDomainDrawer'

const AddDomainButton = () => {
    const { openDrawer, closeDrawer } = useDrawer()

    const handleClick = () => {
        openDrawer(<AddDomainUI />)
    }

    return (
        <Button size="large" onClick={handleClick} icon={<Plus className="size-4" />} type="primary">
            Add Domain
        </Button>
    )
}

export default AddDomainButton