import React, { useEffect, useState } from 'react'
import { userStore } from '../store/userStore'
import { useQuery } from '@tanstack/react-query'
import { retrieveData } from '../utils/utils'
import { Avatar, Button, Card, Divider, Popover, Skeleton } from 'antd'
import { DeleteOutlined, EditOutlined, EllipsisOutlined, EyeOutlined, SettingOutlined } from '@ant-design/icons'
import Meta from 'antd/es/card/Meta'
import AddMembershipPlan from '../components/MembershipPlan/AddMembershipPlan'
import { t } from 'i18next'
import EditMembershipPlan from '../components/MembershipPlan/EditMembershipPlan'
import { MembershipPlanType } from '../@types/MembershipPlan'
import MembershipItemCard from '../components/MembershipPlan/MembershipItemCard'
import ExportToExcel from '../components/Report/ExportToExcel'
import { languageStore } from '../store/languageStore'
import { format } from 'date-fns'

export default function MembershipPlan() {

    const token = userStore((state: any) => state.token)
    const lang: string = languageStore((state: any) => state.lang)


    const header = {
        Authorization: `Bearer ${token}`,
    }

    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['main_page_membership_plan'],
        queryFn: () => retrieveData(`membership-plan`, header),
    })



    const [membershipPlanData, setMembershipPlanData] = useState<MembershipPlanType[]>([]);
    const [exportData, setExportData] = useState(data);

    useEffect(() => {
        setMembershipPlanData(data);
    }, [data])

    useEffect(() => {
        const flattenedData = membershipPlanData?.map(item => (
            lang == "en" ? {
                "Name": item.name,
                "Price": item?.price,
                "Duration(In Month)": item.duration,
                "Max Members": item?.max_member,
                "Access(Per Week)": item.access_level,
                "Created At": format(new Date(item.createdAt), "yyyy-MM-dd"),
            } :
                {

                    "የአባልነት እቅድ ስም": item.name,
                    "ዋጋ": item?.price,
                    "": item.duration,
                    "ከፍተኛ አባላት ቁጥር": item?.max_member,
                    "የአጠቃቀም ቀናት ብዛት (በሳምንት)": item.access_level,
                    "የተመዘገበበት ቀን": format(new Date(item.createdAt), "yyyy-MM-dd"),
                }
        ));
        setExportData(flattenedData)
    }, [membershipPlanData])



    return (
        <div className='w-full'>
            <div className='flex justify-between items-center px-3'>
                <p>{t('membership_plan')}</p>
                <Popover
                    placement="left"
                    key="member_inex"
                    content={
                        <div className='flex flex-col'>
                            <AddMembershipPlan refetch={refetch} />
                            <ExportToExcel
                                button_type='primary'
                                data={exportData}
                                file_name={`membership-plan-reports${new Date().getTime()}.xlsx`} sheet_name='sheet1' />
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
            <div className="lg:px-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.map((item: any) => (
                    <MembershipItemCard refetch={refetch} is_pending={isPending} item_data={item} />
                ))}
            </div>
        </div>
    )
}
