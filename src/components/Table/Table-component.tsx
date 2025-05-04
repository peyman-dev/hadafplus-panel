import React, { useState } from 'react';
import { Divider, Radio, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useSelector } from 'react-redux';
import { StatusType } from '../../core/types/types';
import { ManageButton } from './manage-button';
import { LinkRow } from './link-row';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}


const RenderVerificationState = ({ state }: { state: StatusType }) => {
    switch (state) {
        case "pending":
            return <div className='text-yellow-500'>Pending</div>;

        case "verified":
            return <div className='text-green-500'>Verified</div>;

        case "rejected":
            return <div className='text-red-500'>Not verified</div>;
    }
}


const ColTitle = ({ title }: { title: string }) => <span className='font-light'>{title}</span>

const columns: TableColumnsType<DataType> = [
    {
        title: <ColTitle title='Domain URL' />,
        dataIndex: 'domain',
        render: (text: string) => <LinkRow link={text}/>
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
        render: () => <div>
            <ManageButton />
        </div>
    }
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sydney No. 1 Lake Park',
    },
];

// rowSelection object indicates the need for row selection
const rowSelection: TableProps<DataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

const TableComponent: React.FC = () => {
    // const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
    const store = useSelector((state: any) => state.domains)




    return (
        <div>
            {/* <Radio.Group onChange={(e) => setSelectionType(e.target.value)} value={selectionType}>
                <Radio value="checkbox">Checkbox</Radio>
                <Radio value="radio">radio</Radio>
            </Radio.Group> */}
            <Divider />
            <Table<DataType>
                rowSelection={{ ...rowSelection }}
                columns={columns}
                dataSource={store.domains}
                pagination={{
                    pageSize: 8,
                }}
            />
        </div>
    );
};

export default TableComponent;