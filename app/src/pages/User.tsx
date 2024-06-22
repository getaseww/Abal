import React, { useEffect, useState } from 'react'
import { userStore } from '../store/userStore'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteData, retrieveData } from '../utils/utils'
import { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface'
import { UserType } from '../@types/User'
import { Button, Divider, Popover, TableProps } from 'antd'
import toast from 'react-hot-toast'
import { t } from 'i18next'
import { format } from 'date-fns'
import { languageStore } from '../store/languageStore'
import AddUser from '../components/User/AddUser'
import ExportToExcel from '../components/Report/ExportToExcel'
import CustomTable from '../components/Table/CustomTable'

export default function User() {
    const token = userStore((state: any) => state.token)
    const lang: string = languageStore((state: any) => state.lang)


    const header = {
        Authorization: `Bearer ${token}`,
    }

    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['main_page_users'],
        queryFn: () => retrieveData(`user`, header),
    })

    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<UserType>>({});
    const handleChange: TableProps<UserType>['onChange'] = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<UserType>);
    };


    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteData(`user/${id}`, header),
        onSuccess: () => {
            toast.success(t('deleted_successfully'))
            refetch()
        },
        onError: () => {
            toast.error(t('failed_to_delete'))
        }
    });


    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
    }

    const columns: ColumnsType<UserType> = [
        {
            title: `${t('no')}`,
            key: 'index',
            width: "70px",
            render: (text, record, index) => index + 1,
        },
        {
            title: t('full_name'),
            key: 'full_name',
            sorter: (a, b) => (a.first_name + " " + a.last_name).localeCompare(b.first_name + " " + b.last_name),
            sortOrder: sortedInfo.columnKey === 'full_name' ? sortedInfo.order : null,
            render: (value, record) => <>{record.first_name} {record.last_name}</>,

        },
        {
            title: t('phone_number'),
            dataIndex: 'phone_number',
            key: 'phone_number',
            sorter: (a, b) => a.phone_number.localeCompare(b.phone_number),
            sortOrder: sortedInfo.columnKey === 'phone_number' ? sortedInfo.order : null,
        },
        {
            title: t('company_category'),
            key: 'company_category',
            render: (value, record) => <>{record?.company_category}</>
        },
        {
            title: t('sex'),
            key: 'sex',
            render: (value, record) => <>{record?.profile?.sex}</>
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
            render: (val, record: any) => (
                <Popover
                    placement="right"
                    key={val}
                    content={
                        <div className='flex flex-col'>
                            {/* <EditMember refetch={refetch} record={record} /> */}
                            {/* <ViewMember record={record} /> */}
                            {/* <Popconfirm
                    title={t('delete_the_data')}
                    description={t('confirm_deletion')}
                    onConfirm={() => handleDelete(record.id)}
                    okText={t('yes')}
                    cancelText={t('no')}
                    okButtonProps={{ style: { background: "green", color: "white", border: "3px" } }} // Customize the "Yes" button styles
                    cancelButtonProps={{ style: { background: "red", color: "white" } }}
                  >
                    <Button danger type="text"><DeleteOutlined />{t('delete')}</Button>
                  </Popconfirm> */}
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

    const [userData, setUserData] = useState<UserType[]>([]);
    const [exportData, setExportData] = useState(data);

    useEffect(() => {
        setUserData(data);
    }, [data])

    useEffect(() => {
        const flattenedData = userData?.map(item => (
            lang == "en" ? {
                "First Name": item.first_name,
                "Last Name": item?.last_name,
                "Category": item?.company_category,
                "Phone Number": item.phone_number,
                "Sex": item.profile?.sex,
                "Address": item.profile?.address,
                "Created At": format(new Date(item.createdAt), "yyyy-MM-dd"),
            } :
                {
                    "የመጀመሪያ ስም": item.first_name,
                    "የአባት ስም": item?.last_name,
                    "ስልክ ቁጥር": item.phone_number,
                    "ምድብ": item?.company_category,
                    "ጾታ": item.profile?.sex,
                    "አድራሻ": item.profile?.address,
                    "የተመዘገበበት ቀን": format(new Date(item.createdAt), "yyyy-MM-dd"),
                }
        ));
        setExportData(flattenedData)
    }, [userData])


    return (
        <div className='w-full'>
            <div className='flex justify-between items-center px-3'>
                <p>{t('user')}</p>
                <Popover
                    placement="left"
                    key="member_inex"
                    content={
                        <div className='flex flex-col'>
                            <AddUser refetch={refetch} />
                            <ExportToExcel
                                button_type='primary'
                                data={exportData}
                                file_name={`user-reports${new Date().getTime()}.xlsx`} sheet_name='sheet1' />
                        </div>
                    }
                    trigger="click"
                >
                    <Button className='border-none text-center' type='text'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 128 512" >
                            <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                        </svg>
                    </Button>
                </Popover>
            </div>
            <Divider className='w-full borer' />
            <div className="lg:px-20 ">
                <CustomTable column={columns} data={data} handleChange={handleChange} />
            </div>
        </div>
    )
}
