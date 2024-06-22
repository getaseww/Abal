import { ColumnsType, TableProps } from 'antd/es/table/InternalTable';
import CustomTable from '../../../components/Table/CustomTable.tsx';
import { useEffect, useState } from 'react';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { Button, Divider, Form, Popconfirm, Popover, Tag } from 'antd';
import Search, { SearchProps } from 'antd/es/input/Search';
import { t } from 'i18next';
import { userStore } from '../../../store/userStore.ts';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';
import ExportToExcel from '../../../components/Report/ExportToExcel.tsx';
import { SubscriptionType } from '../../SMS/Subscription/type.ts';
import { languageStore } from '../../../store/languageStore.ts';
import { formatNumber, retrieveData } from '../../../utils/utils.ts';


const SMSSubscriptionReport: React.FC = () => {

    const token = userStore((state: any) => state.token)
    const [query, setQuery] = useState<any>()
    const lang: string = languageStore((state: any) => state.lang)

    const header = {
        Authorization: `Bearer ${token}`,
    }

    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['sms-subscription-report'],
        queryFn: () => retrieveData(`sms-subscription?name=${query}`, header),
    })


    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<SubscriptionType>>({});

    const [exportData, setExportData] = useState(data);

    useEffect(() => {
        const flattenedData = data?.map(item => (
            lang == "en" ? {
                "Subscription Plan": item.package?.name,
                "Amount (ETB)": formatNumber(item.amount),
                "Total SMS": formatNumber(item.quantity),
                "Status": item.is_approved ? "Approved" : "Pending",
                "Created At": format(new Date(item.createdAt), "yyyy-MM-dd"),
            } :
                {

                    "የደንበኝነት ደረጃዎች": item.package?.name,
                    "የብር መጠን": formatNumber(item.amount),
                    "ጠቅላላ ኤስኤምኤስ": formatNumber(item.quantity),
                    "ሁኔታ": item.is_approved ? "ጸድቋል" : "በመጠባበቅ ላይ",
                    "የተመዘገበበት ቀን": format(new Date(item.createdAt), "yyyy-MM-dd"),
                }
        ));
        setExportData(flattenedData)
    }, [data])

    const columns: ColumnsType<SubscriptionType> = [
        {
            title: `${t('subscription_plan')}`,
            dataIndex: 'subscription_plan',
            key: 'subscription_plan',
            sorter: (a, b) => a.amount - b.amount,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
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
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
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
    ];

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    useEffect(() => {
        refetch();
    }, [query])


    const handleChange: TableProps<SubscriptionType>['onChange'] = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
    };

    return (
        <div className='w-full pt-3'>
            <div className='flex justify-between items-center px-3'>
                <Search placeholder={t('income_expense_search_placeholder')} onChange={(e) => setQuery(e.target.value)} onSearch={onSearch} className='w-100 bg-white dark:bg-boxdark' />
                <ExportToExcel data={exportData} file_name={`sms-subscription-report${new Date().getTime()}.xlsx`} sheet_name='sheet1' />
            </div>
            <Divider className='w-full borer' />
            <div className="lg:px-20 ">
                <CustomTable column={columns} data={data} handleChange={handleChange} />
            </div>
        </div>
    );
};

export default SMSSubscriptionReport;
