import { DeleteOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Popconfirm, Skeleton } from 'antd'
import React from 'react'
import EditMembershipPlan from './EditMembershipPlan'
import { MembershipPlanType } from '../../@types/MembershipPlan'
import Meta from 'antd/es/card/Meta'
import ViewMembershipPlan from './ViewMembership'
import { t } from 'i18next'
import { useMutation } from '@tanstack/react-query'
import { deleteData } from '../../utils/utils'
import { userStore } from '../../store/userStore'
import toast from 'react-hot-toast'

export default function MembershipItemCard({ is_pending, refetch, item_data }: { is_pending: boolean, refetch: Function, item_data: MembershipPlanType }) {
  const token = userStore((state: any) => state.token)

  const header = {
    Authorization: `Bearer ${token}`,
  }

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteData(`membership-plan/${id}`, header),
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

  return (
    <Card
      style={{ width: 300, marginTop: 16 }}
      actions={[
          <Popconfirm
            title={t('delete_the_data')}
            description={t('confirm_deletion')}
            onConfirm={() => handleDelete(item_data.id)}
            okText={t('yes')}
            cancelText={t('no')}
            okButtonProps={{ style: { background: "green", color: "white", border: "3px" } }} // Customize the "Yes" button styles
            cancelButtonProps={{ style: { background: "red", color: "white" } }}
          >
            <DeleteOutlined key="delete" />
          </Popconfirm>
        ,
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
