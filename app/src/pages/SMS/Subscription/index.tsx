import { ColumnsType, TableProps } from 'antd/es/table/InternalTable';
import CustomTable from '../../../components/Table/CustomTable.tsx'; import { useEffect, useState } from 'react';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { Button, Form, Popconfirm, Popover } from 'antd';
import Search, { SearchProps } from 'antd/es/input/Search';
import { deleteData, formatNumber, postData, putData, retrieveData } from '../../../utils/utils.ts';
import { SubscriptionType } from './type.ts';
import EditSubscription from './EditSubscription.tsx';
import { t } from 'i18next';
import { userStore } from '../../../store/userStore.ts';
import AddSubscription from './AddSubscription.tsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { Role } from '../../../enums/generalEnums.ts';




const Subscription: React.FC = () => {

    const token = userStore((state: any) => state.token)

    const [query, setQuery] = useState<any>()
    const header = {
        Authorization: `Bearer ${token}`,
    }

    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['smssubscription'],
        queryFn: () => retrieveData(`sms/subscription?name=${query}`, header),
    })

    const { data: roleData } = useQuery({
        queryKey: ['role_subscription_sms'],
        queryFn: () => retrieveData(`role/${JSON.parse(user)?.role_id}`, header),
    })


    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<SubscriptionType>>({});

    const handleChange: TableProps<SubscriptionType>['onChange'] = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<SubscriptionType>);
    };



    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteData(`sms/subscription/${id}`, header),
        onSuccess: () => {
            toast.success(t('sms_subscription_deleted_successfully'))
            refetch()
        },
        onError: () => {
            toast.error(t('failed_to_delete_sms_subscription'))
        }
    });

    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
    }

    const updateMutation = useMutation({
        mutationFn: (data: any) => postData(`sms/subscription`, { id: data.id, is_approved: true, amount: data.amount, user_id: data.user_id, package_id: data.package_id, quantity: data.quantity }, header),
        onSuccess: () => {
            toast.success(t('subscription_successful_update'))
            refetch()
        },
        onError: () => {
            toast.error(t('subscription_failed_update'))
        }
    });

    const handleApprove = (data: any) => {
        updateMutation.mutate(data);
    }
    const user = userStore((state: any) => state.user);





    const columns: ColumnsType<SubscriptionType> = [
        {
            title: `${t('subscription_plan')}`,
            dataIndex: 'subscription_plan',
            key: 'subscription_plan',
            // sorter: (a, b) => a.package?.name.localeCompare(b.package?.name),
            sortOrder: sortedInfo.columnKey === 'subscription_plan' ? sortedInfo.order : null,
            ellipsis: true,
            render: (val, record) => (
                <>{record.package?.name}</>
            ),
        },
        {
            title: `${t('amount')}`,
            dataIndex: 'amount',
            key: 'amount',
            sorter: (a, b) => a.amount - b.amount,
            sortOrder: sortedInfo.columnKey === 'amount' ? sortedInfo.order : null,
            ellipsis: true,
            render: (val, record) => (
                <>{formatNumber(val)} Birr</>
            ),
        },
        {
            title: `${t('total_sms')}`,
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
            sortOrder: sortedInfo.columnKey === 'quantity' ? sortedInfo.order : null,
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
                            {/*     <EditSubscription data={record} refetch={refetch} /> */}
                            {JSON.parse(JSON.stringify(roleData))?.name == Role.ADMIN && !record.is_approved && <Popconfirm
                                title={t('approve_sms_subscription')}
                                description={t('confirm_approve')}
                                onConfirm={() => handleApprove(record)}
                                okText={t('yes')}
                                cancelText={t('no')}
                                okButtonProps={{ style: { background: "green", color: "white", border: "3px" } }} // Customize the "Yes" button styles
                                cancelButtonProps={{ style: { background: "red", color: "white" } }}
                            >
                                <Button type="text">{t('approve')}</Button>
                            </Popconfirm>
                            }
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
    useEffect(() => {
        refetch();
    }, [query])
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    console.log("package data", data);

    return (
        <>
            <div>
                <div className='flex justify-between pb-5'>
                    <Search placeholder={t('package_search_placeholder')} onSearch={onSearch} onChange={(e) => setQuery(e.target.value)} className='w-100 bg-white dark:bg-boxdark' />
                    <AddSubscription refetch={refetch} />
                </div>
                <CustomTable column={columns} data={data} handleChange={handleChange} />
            </div>
        </>
    );
};

export default Subscription;
