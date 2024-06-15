import React from 'react'
import { userStore } from '../store/userStore'
import { useQuery } from '@tanstack/react-query'
import { retrieveData } from '../utils/utils'
import { Avatar, Card, Skeleton } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import Meta from 'antd/es/card/Meta'

export default function MembershipPlan() {

    const token = userStore((state: any) => state.token)
    const header = {
        Authorization: `Bearer ${token}`,
    }

    const { data, isPending, error, refetch } = useQuery({
        queryKey: ['main_page_membership_plan'],
        queryFn: () => retrieveData(`membership-plan`, header),
    })

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.map((item:any) => (
                    <Card
                        style={{ width: 300, marginTop: 16 }}
                        actions={[
                            <SettingOutlined key="setting" />,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Skeleton loading={isPending} avatar active>
                            <Meta
                                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />}
                                title="Card title"
                                description="This is the description"
                            />
                        </Skeleton>
                    </Card>
                ))}
            </div>
        </div>
    )
}
