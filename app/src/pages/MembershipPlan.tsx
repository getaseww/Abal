import React from 'react'
import { userStore } from '../store/userStore'
import { useQuery } from '@tanstack/react-query'
import { retrieveData } from '../utils/utils'
import { Avatar, Card, Divider, Skeleton } from 'antd'
import { DeleteOutlined, EditOutlined, EllipsisOutlined, EyeOutlined, SettingOutlined } from '@ant-design/icons'
import Meta from 'antd/es/card/Meta'
import AddMembershipPlan from '../components/MembershipPlan/AddMembershipPlan'
import { t } from 'i18next'
import EditMembershipPlan from '../components/MembershipPlan/EditMembershipPlan'
import { MembershipPlanType } from '../@types/MembershipPlan'
import MembershipItemCard from '../components/MembershipPlan/MembershipItemCard'

export default function MembershipPlan() {

    const token = userStore((state: any) => state.token)
    const header = {
        Authorization: `Bearer ${token}`,
    }

    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['main_page_membership_plan'],
        queryFn: () => retrieveData(`membership-plan`, header),
    })

    console.log("membership plan", data)

    return (
        <div className='w-full'>
            <div className='flex justify-between items-center px-3'>
                <p>{t('membership_plan')}</p>
                <AddMembershipPlan refetch={refetch} />
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
