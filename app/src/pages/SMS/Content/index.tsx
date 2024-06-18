import { ColumnsType, TableProps } from 'antd/es/table/InternalTable';
import CustomTable from '../../../components/Table/CustomTable.tsx'; import { useEffect, useState } from 'react';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { Button, Form, Popconfirm, Popover } from 'antd';
import Search, { SearchProps } from 'antd/es/input/Search';
import { ContentType } from './type.ts';
import EditContent from './EditContent.tsx';
import { t } from 'i18next';
import { userStore } from '../../../store/userStore.ts';
import AddContent from './AddContent.tsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { deleteData, retrieveData } from '../../../utils/utils.ts';
import { Role, SMSSTATUS } from '../../../enums/enums.ts';




const Content: React.FC = () => {

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const token = userStore((state: any) => state.token)
    const [query, setQuery] = useState<any>()
    const user: any = JSON.parse(userStore((state: any) => state.user))
    const header = {
        Authorization: `Bearer ${token}`,
    }

    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['content'],
        queryFn: () => retrieveData(`sms/content?name=${query}`, header),
    })

    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<ContentType>>({});

    const handleChange: TableProps<ContentType>['onChange'] = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<ContentType>);
    };



    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteData(`sms/content/${id}`, header),
        onSuccess: () => {
            toast.success(t('content_deleted_successfully'))
            refetch()
        },
        onError: () => {
            toast.error(t('failed_to_delete_content'))
        }
    });

    const handleDelete = (id: number, status: string) => {
        if (status == SMSSTATUS.APPPROVED)
            toast.error(t('failed_to_delete_content_already_approved'))
        else
            deleteMutation.mutate(id);
    }

    const columns: ColumnsType<ContentType> = [
        {
            title: `${t('content_title')}`,
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            sortOrder: sortedInfo.columnKey === 'title' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: `${t('content_status')}`,
            dataIndex: 'status',

            render: (val, record) => (
                <>{t(val)}</>
            ),
            ellipsis: true,
        },
        {
            title: `${t('content_sent_date')}`,
            dataIndex: 'sent_date',
            key: 'sent_date',
            filteredValue: filteredInfo.id || null,
            render: (val, record) => (
                <>{val != null && format(new Date(val), "yyyy-MM-dd")}</>
            ),
            sorter: (a, b) => new Date(a.sent_date).getTime() - new Date(b.sent_date).getTime(),
            sortOrder: sortedInfo.columnKey === 'sent_date' ? sortedInfo.order : null,
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
                            {user.role == Role.ADMIN && record.status == SMSSTATUS.PENDING && <EditContent data={record} refetch={refetch} />}
                            {(user.role == Role.MEMBER) && <EditContent data={record} refetch={refetch} />}

                            {(user.role == Role.MEMBER) && <Popconfirm
                                title={t('delete_the_data')}
                                description={t('confirm_deletion')}
                                onConfirm={() => handleDelete(record.id, record.status)}
                                // onCancel={cancel}
                                okText={t('yes')}
                                cancelText={t('no')}
                                okButtonProps={{ style: { background: "green", color: "white", border: "3px" } }} // Customize the "Yes" button styles
                                cancelButtonProps={{ style: { background: "red", color: "white" } }}
                            >
                                <Button danger type="text">{t('delete')}</Button>
                            </Popconfirm>}
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

    return (
        <div className='w-full p-5'>
        <div>
                <div className='flex justify-between pb-5'>
                    <Search placeholder={t('content_search_placeholder')} onSearch={onSearch} onChange={(e) => setQuery(e.target.value)} className='w-100 bg-white dark:bg-boxdark' />
                    <AddContent refetch={refetch} />
                </div>
                {/* {user.role == Role.COMMUNITY && <CustomTable column={columns} data={data} handleChange={handleChange} />}
                {user.role == Role.ADMIN && <CustomTable column={columns} data={data && data?.filter((i: any) => i?.status == SMSSTATUS.PENDING)} handleChange={handleChange} />} */}
                <CustomTable column={columns} data={data} handleChange={handleChange} />

            </div>
        </div>
    );
};

export default Content;
