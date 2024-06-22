import { ColumnsType, TableProps } from 'antd/es/table/InternalTable';
import CustomTable from '../../../components/Table/CustomTable.tsx';
import { useEffect, useState } from 'react';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import Search, { SearchProps } from 'antd/es/input/Search';
import { t } from 'i18next';
import { userStore } from '../../../store/userStore.ts';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import ExportToExcel from '../../../components/Report/ExportToExcel.tsx';
import { languageStore } from '../../../store/languageStore.ts';
import { ContentType } from '../../SMS/Content/type.ts';
import { retrieveData } from '../../../utils/utils.ts';
import { Divider } from 'antd';


const SMSContentReport: React.FC = () => {

    const token = userStore((state: any) => state.token)
    const [query, setQuery] = useState<any>()
    const lang: string = languageStore((state: any) => state.lang)

    const header = {
        Authorization: `Bearer ${token}`,
    }

    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['sms-content-report'],
        queryFn: () => retrieveData(`content?name=${query}`, header),
    })


    const [contentData, setContentData] = useState([]);

    useEffect(() => {
        setContentData(data);
    }, [data])


    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<ContentType>>({});

    const [exportData, setExportData] = useState(data);


    const handleChange: TableProps<ContentType>['onChange'] = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        const filteredDataSource = data.filter((record) => {
            return Object.keys(filters).every((key) => {
                const filterValues = filters[key];
                if (filterValues && filterValues.length > 0) {
                    return filterValues.includes(String(record[key]));
                }
                return true;
            });
        });

        setContentData(filteredDataSource)

        setSortedInfo(sorter as SorterResult<ContentType>);
    };

    useEffect(() => {
        const flattenedData = contentData?.map(item => (
            lang == "en" ? {
                "Title": item.title,
                "SMS Body": item.body,
                "Phone Numbers": item.phone_numbers,
                "Status": item.status,
                "Created At": format(new Date(item.createdAt), "yyyy-MM-dd"),
            } :
                {

                    "ርዕስ": item.title,
                    "ዋና የጽሑፍ መልእክት": item.body,
                    "መልእክት የተቀበሉ ስልክ ቁጥሮች": item.phone_numbers,
                    "ሁኔታ": item.status,
                    "የተመዘገበበት ቀን": format(new Date(item.createdAt), "yyyy-MM-dd"),
                }
        ));
        setExportData(flattenedData)
    }, [contentData])

    const columns: ColumnsType<ContentType> = [
        {
            title: `${t('content_title')}`,
            dataIndex: 'title',
            key: 'title',
            filteredValue: filteredInfo.name || null,
            //   onFilter: (value: string, record) => record.full_name.includes(value),
            sorter: (a, b) => a.title.length - b.title.length,
            sortOrder: sortedInfo.columnKey === 'title' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: `${t('no_of_sms_sent')}`,
            dataIndex: 'phone_numbers',
            key: 'phone_numbers',
            filteredValue: filteredInfo.name || null,
            render: (val, record) => (
                <>{record.phone_numbers.split(',').length}</>
            ),
            sorter: (a, b) => a.phone_numbers.length - b.phone_numbers.length,
            sortOrder: sortedInfo.columnKey === 'phone_numbers' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: `${t('content_status')}`,
            dataIndex: 'status',
            filters: [
                {
                    text: t('approved'),
                    value: "Approved",
                },
                {
                    text: t('pending'),
                    value: "Pending",
                },
                {
                    text: t('rejected'),
                    value: "Rejected",
                },
            ],
            onFilter: (value: string, record) => record.status.indexOf(value) === 0,

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
            sorter: (a, b) => a.id - b.id,
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
    ];

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    useEffect(() => {
        refetch();
    }, [query])




    return (
        <div className='w-full pt-3'>
            <div className='flex justify-between items-center px-3'>
                <Search placeholder={t('income_expense_search_placeholder')} onChange={(e) => setQuery(e.target.value)} onSearch={onSearch} className='w-100 bg-white dark:bg-boxdark' />
                <ExportToExcel data={exportData} file_name={`sms-content-reports${new Date().getTime()}.xlsx`} sheet_name='sheet1' />
            </div>
            <Divider className='w-full borer' />
            <div className="lg:px-20 ">
                <CustomTable column={columns} data={data} handleChange={handleChange} />
            </div>
        </div>
    );
};


export default SMSContentReport;
