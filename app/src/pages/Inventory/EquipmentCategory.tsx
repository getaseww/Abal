import { useState } from 'react'
import { userStore } from '../../store/userStore'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteData, retrieveData } from '../../utils/utils'
import { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface'
import { Button, Divider, Popconfirm, Popover, TableProps } from 'antd'
import toast from 'react-hot-toast'
import { t } from 'i18next'
import { format } from 'date-fns'
import CustomTable from '../../components/Table/CustomTable'
import { DeleteOutlined } from '@ant-design/icons'
import { EquipmentCategoryType } from '../../@types/types'
import EditEquipmentCategory from '../../components/Inventory/EquipmentCategory/EditEquipmentCategory'
import ViewEquipmentCategory from '../../components/Inventory/EquipmentCategory/ViewEquipmentCategory'
import AddEquipmentCategory from '../../components/Inventory/EquipmentCategory/AddEquipmentCategory'

export default function EquipmentCategory() {
    const token = userStore((state: any) => state.token)
    const header = {
        Authorization: `Bearer ${token}`,
    }

    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['main_page_equipment_category'],
        queryFn: () => retrieveData(`inventory/equipment-category`, header),
    })

    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<EquipmentCategoryType>>({});
    const handleChange: TableProps<EquipmentCategoryType>['onChange'] = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<EquipmentCategoryType>);
    };


    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteData(`inventory/equipment-category/${id}`, header),
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



    const columns: ColumnsType<EquipmentCategoryType> = [
        {
            title: `${t('no')}`,
            key: 'index',
            width: "70px",
            render: (text, record, index) => index + 1,
        },
        {
            title: t('name'),
            key: 'name',
            dataIndex: "name"
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
                            <EditEquipmentCategory refetch={refetch} record={record} />
                            <ViewEquipmentCategory record={record} />
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




    return (
        <div className='w-full'>
            <div className='flex justify-between items-center px-3'>
                <p>{t('equipment_category')}</p>
                <AddEquipmentCategory refetch={refetch} />
            </div>
            <Divider className='w-full borer' />
            <div className="lg:px-20 ">
                <CustomTable column={columns} data={data} handleChange={handleChange} />
            </div>
        </div>
    )
}
