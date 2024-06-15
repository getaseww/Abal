import { DeleteOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Skeleton } from 'antd'
import React from 'react'
import EditMembershipPlan from './EditMembershipPlan'
import { MembershipPlanType } from '../../@types/MembershipPlan'
import Meta from 'antd/es/card/Meta'
import ViewMembershipPlan from './ViewMembership'
import { t } from 'i18next'

export default function MembershipItemCard({ is_pending, refetch, item_data }: { is_pending: boolean, refetch: Function, item_data: MembershipPlanType }) {
  return (
    <Card
      style={{ width: 300, marginTop: 16 }}
      actions={[
        <DeleteOutlined key="delete" />,
        <EditMembershipPlan refetch={refetch} record={item_data} />,
        <ViewMembershipPlan record={item_data} />
      ]}
    >
      <Skeleton loading={is_pending} avatar active>
        <Meta
          avatar={<UserOutlined />}
          title={item_data.name}
          description={
            <div >
              <p className='text-lg'>{item_data.duration} {t('months')}</p>
              <p className='text-lg'>{item_data.price} {t('birr')}</p>
              <p className='text-lg'>{item_data.access_level} {t('days_per_week')}</p>

            </div>}
        />
      </Skeleton>
    </Card>)
}
