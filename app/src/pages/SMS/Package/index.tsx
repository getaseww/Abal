import { ColumnsType, TableProps } from 'antd/es/table/InternalTable';
import CustomTable from '../../../components/Table/CustomTable.tsx';import { useEffect, useState } from 'react';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { Button, Form, Popconfirm, Popover } from 'antd';
import Search, { SearchProps } from 'antd/es/input/Search';
import { deleteData, retrieveData } from '../../../utils/utils.ts';
import { PackageType } from './type.ts';
import EditPackage from './EditPackage.tsx';
import { t } from 'i18next';
import { userStore } from '../../../store/userStore.ts';
import AddPackage from './AddPackage.tsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import toast from 'react-hot-toast';




const Package: React.FC = () => {

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const token = userStore((state: any) => state.token)
    const [query,setQuery]=useState<any>()
    const header = {
        Authorization: `Bearer ${token}`,
    }

   const { data, isPending, error, refetch } = useQuery({
        queryKey: ['package'],
        queryFn: () => retrieveData(`sms/package?name=${query}`, header),
        refetchOnWindowFocus: true,
    })




    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<PackageType>>({});

    const handleChange: TableProps<PackageType>['onChange'] = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<PackageType>);
    };



    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteData(`package/${id}`,header),
        onSuccess: () => {
            toast.success(t('package_deleted_successfully'))
            refetch()
        },
        onError: () => {
            toast.error(t('failed_to_delete_package'))
        }
    });

    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
    }

    const columns: ColumnsType<PackageType> = [
        {
            title: `${t('package_name')}`,
            dataIndex: 'name',
            key: 'name',
            filteredValue: filteredInfo.name || null,
            //   onFilter: (value: string, record) => record.full_name.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: `${t('package_price')}`,
            dataIndex: 'price',
            key: 'price',
            filteredValue: filteredInfo.name || null,
            //   onFilter: (value: string, record) => record.full_name.includes(value),
            sorter: (a, b) => a.price - b.price,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: `${t('package_quantity')}`,
            dataIndex: 'quantity',
            key: 'quantity',
            filteredValue: filteredInfo.name || null,
            //   onFilter: (value: string, record) => record.full_name.includes(value),
            sorter: (a, b) => a.quantity - b.quantity,
            sortOrder: sortedInfo.columnKey === 'quantity' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: `${t('created_at')}`,
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (val, record) => (
                <>{format(new Date(val), "yyyy-MM-dd")}</>
            ),
            sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
            sortOrder: sortedInfo.columnKey === 'createdAt' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: `${t('action')}`,
            dataIndex: 'id',
            key: 'id',
            render: (val, record) => (
                <Popover
                    placement="right"
                    key={val}
                    content={
                        <div className='flex flex-col'>
                            <EditPackage data={record} refetch={refetch}/>
                            
                            <Popconfirm
                                title={t('delete_the_data')}
                                description={t('confirm_deletion')}
                                onConfirm={() => handleDelete(record.id)}
                                // onCancel={cancel}
                                okText={t('yes')}
                                cancelText={t('no')}
                                okButtonProps={{ style: { background: "green", color: "white", border: "3px" } }} // Customize the "Yes" button styles
                                cancelButtonProps={{ style: { background: "red", color: "white" } }}
                            >
                                <Button danger type="text">{t('delete')}</Button>
                            </Popconfirm>
                        </div>
                    }
                    trigger="click"
                >
                    <Button className='border-none' >
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 128 512" >
                            <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                        </svg>
                    </Button>
                </Popover>
            )

        },
    ];
    useEffect(()=>{
        refetch();
    },[query])
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    return (
        <div className='w-full p-5'>
        <div>
                <div className='flex justify-between pb-5'>
                    <Search placeholder={t('package_search_placeholder')} onSearch={onSearch} onChange={(e)=>setQuery(e.target.value)} className='w-100 bg-white dark:bg-boxdark' />
                    <AddPackage refetch={refetch} />
                </div>
                <CustomTable column={columns} data={data} handleChange={handleChange} />
                
            </div>
        </div>
    );
};

export default Package;
