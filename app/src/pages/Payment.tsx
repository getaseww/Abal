import React, { useEffect, useState } from 'react'
import { userStore } from '../store/userStore'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteData, formatNumber, retrieveData } from '../utils/utils'
import { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface'
import { PaymentType } from '../@types/Payment'
import { Button, Divider, Popover, TableProps } from 'antd'
import toast from 'react-hot-toast'
import { t } from 'i18next'
import { format } from 'date-fns'
import AddPayment from '../components/Payment/AddPayment'
import CustomTable from '../components/Table/CustomTable'
import { languageStore } from '../store/languageStore'
import ExportToExcel from '../components/Report/ExportToExcel'

export default function Payment() {
  const token = userStore((state: any) => state.token)
  const lang: string = languageStore((state: any) => state.lang)


  const header = {
    Authorization: `Bearer ${token}`,
  }

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['main_page_payment'],
    queryFn: () => retrieveData(`payment`, header),
  })

  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<PaymentType>>({});
  const handleChange: TableProps<PaymentType>['onChange'] = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<PaymentType>);
  };


  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteData(`payment/${id}`, header),
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



  const columns: ColumnsType<PaymentType> = [
    {
      title: `${t('no')}`,
      key: 'index',
      width: "70px",
      render: (text, record, index) => index + 1,
    },
    {
      title: t('full_name'),
      key: 'full_name',
      sorter: (a, b) => (a.payer?.first_name + " " + a.payer?.last_name).localeCompare(b.payer?.first_name + " " + b.payer?.last_name),
      sortOrder: sortedInfo.columnKey === 'full_name' ? sortedInfo.order : null,
      render: (value, record) => <>{record.payer?.first_name} {record.payer?.last_name}</>,

    },
    {
      title: t('phone_number'),
      dataIndex: 'phone_number',
      key: 'phone_number',
      sorter: (a, b) => a.payer?.phone_number.localeCompare(b.payer?.phone_number),
      sortOrder: sortedInfo.columnKey === 'phone_number' ? sortedInfo.order : null,
      render: (value, record) => <>{record?.payer?.phone_number}</>

    },

    {
      title: `${t('payment_month')}`,
      dataIndex: 'date',
      key: 'date',
      render: (val, record) => (
        <>{format(new Date(val), "yyyy-MM-dd")}</>
      ),
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null,
    },
    {
      title: t('amount'),
      dataIndex: 'amount',
      key: 'amount',
      render: (value, record) => <>{formatNumber(value)}</>
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
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


  const [paymentData, setPaymentData] = useState<PaymentType[]>([]);
  const [exportData, setExportData] = useState(data);

  useEffect(() => {
    setPaymentData(data);
  }, [data])

  useEffect(() => {
    const flattenedData = paymentData?.map(item => (
      lang == "en" ? {
        "First Name": item.payer?.first_name,
        "Last Name": item?.payer?.last_name,
        "Phone Number": item.payer?.phone_number,
        "Amount": item.amount,
        "Transaction Reference": item?.trx_ref,
        "Status": item.status,
        "Payment Date": format(new Date(item.date), "yyyy-MM-dd"),
        "Created At": format(new Date(item.createdAt), "yyyy-MM-dd"),
      } :
        {

          "የመጀመሪያ ስም": item.payer?.first_name,
          "የአባት ስም": item?.payer?.last_name,
          "ስልክ ቁጥር": item.payer?.phone_number,
          "ዋጋ በብር": item.amount,
          "የንግድ ውል መገበያያ": item?.trx_ref,
          "ሁኔታ": item.status,
          "የክፍያ ቀን": format(new Date(item.date), "yyyy-MM-dd"),
          "የተመዘገበበት ቀን": format(new Date(item.createdAt), "yyyy-MM-dd"),
        }
    ));
    setExportData(flattenedData)
  }, [paymentData])




  return (
    <div className='w-full'>
      <div className='flex justify-between items-center px-3'>
        <p>{t('payment')}</p>
        <Popover
          placement="left"
          key="member_inex"
          content={
            <div className='flex flex-col'>
              <AddPayment refetch={refetch} />
              <ExportToExcel
                button_type='primary'
                data={exportData}
                file_name={`payment-reports${new Date().getTime()}.xlsx`} sheet_name='sheet1' />
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
