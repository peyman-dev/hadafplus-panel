import { Button, Select } from 'antd';
import { Plus } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderType } from '../core/types/types';
import { orderItems } from '../core/redux/reducers/domains-reducer';

export const HeaderSection = () => {
    const selector = useSelector((store: any) => store.domains);
    const dispatch = useDispatch()

    const DomainsLength = () => {
        return <span>{`(${selector.domains?.length})`}</span>;
    };


    type OptionType = {
        value: OrderType,
        label: string
    }

    // تعریف گزینه‌های Order
    const options: OptionType[] = [

        { value: "DEFAULT_SORT", "label": "Default" },
        { value: 'BY_ASC', label: 'Order by Ascending' },
        { value: 'BY_DESC', label: 'Order by Descending' },
        { value: "BY_ACTIVATION", label: "Order by Active" },
        { value: "BY_STATUS", label: "Order by Status" },

    ];

    return (
        <div>
            <div>
                <h1 className="text-4xl">
                    Domains <DomainsLength />
                </h1>

                <div className="mt-4 flex items-center justify-between">
                    <Button size="large" icon={<Plus className="size-4" />} type="primary">
                        Add Domain
                    </Button>
                    <div className="flex items-center gap-3">
                        {/* تنظیم Select با گزینه‌های Order و مقدار پیش‌فرض */}
                        <Select
                            defaultValue="DEFAULT_SORT" // مقدار پیش‌فرض
                            options={options}
                            onChange={(value: OrderType) => {
                                dispatch(orderItems(value))
                            }}
                            size="large"
                            className="[&_>_.ant-select-selector]:!pr-6 min-w-[200px]"
                        />
                    </div>
                </div>
            </div>
            <section></section>
        </div>
    );
};