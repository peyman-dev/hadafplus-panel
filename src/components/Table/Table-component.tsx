import React, { useState } from 'react';
import { Divider, message, Radio, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useSelector } from 'react-redux';
import { DomainType, StatusType } from '../../core/types/types';
import { ManageButton } from './components/manage-button';
import { LinkRow } from './components/link-row';
import { CircleAlert, XCircle } from 'lucide-react';
import { DomainsState } from '../../core/redux/reducers/domains-reducer';



const RenderVerificationState = ({ state }: { state: StatusType }) => {
    switch (state) {
        case "pending":
            return <div className='text-yellow-500'>Pending</div>;

        case "verified":
            return <div className='text-green-500'>Verified</div>;

        case "rejected":
            return <div className='text-red-500'>Not verified</div>;

        default:
            return <div className='text-orange-500 flex items-center gap-1'>
                <CircleAlert className='size-4' />
                <span>
                    Not added !
                </span>
            </div>;
    }
}


const ColTitle = ({ title }: { title: string }) => <span className='font-light'>{title}</span>

const columns: TableColumnsType<DomainType> = [
    {
        title: <ColTitle title='Domain URL' />,
        dataIndex: 'domain',
        render: (text: string, data: DomainType) => typeof text === "string" ? <LinkRow status={{
            isActive: data.isActive,
            status: data.status
        }} link={text} /> : <div className='flex items-center gap-2 text-red-500'> <XCircle className='size-4' />
            <span>
                Wrong domain entered
            </span>
        </div>
    },
    {
        title: <ColTitle title='Active' />,
        dataIndex: 'isActive',
        render: (isActive) => <div className={isActive ? `text-green-500` : "text-red-500"}>
            {isActive ? "Active" : "Not Active"}
        </div>
    },
    {
        title: <ColTitle title='Verification Status' />,
        dataIndex: 'status',
        render: (state: StatusType) => {
            return <RenderVerificationState state={state} />
        }
    },
    {
        title: "",
        render: (_, data: DomainType) => <div>
            <ManageButton domain={data} />
        </div>
    }
];




const TableComponent: React.FC = () => {
    const store = useSelector((state: any) => state.domains)
    const [_, renderMessage] = message.useMessage()



    return (
        <>
            <div>
                <Table<DomainType>
                    columns={columns}
                    dataSource={store.isUsingFilters ? store.filteredDomains : store.domains}
                    pagination={{
                        pageSize: 8,
                    }}
                />
            </div>
        </>
    );
};

export default TableComponent;