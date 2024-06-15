import React, { useState } from 'react'
import { MembershipPlanType } from '../../@types/MembershipPlan';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { userStore } from '../../store/userStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { postData, retrieveData } from '../../utils/utils';
import toast from 'react-hot-toast';
import { t } from 'i18next';
import SidePanel from '../SidePanel';
import TextArea from 'antd/es/input/TextArea';
import { EditOutlined } from '@ant-design/icons';
import { UserType } from '../../@types/User';
import { SubscriptionType } from '../../@types/Subscription';

export default function EditSubscription({ record, refetch }: { record: SubscriptionType, refetch: Function }) {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const token = userStore((state: any) => state.token)

    const header = {
        Authorization: `Bearer ${token}`,
    }

    const { data: userData } = useQuery({
        queryKey: ['edit_subscription_user'],
        queryFn: () => retrieveData(`user`, header),
    })

    const { data: membershipPlanData } = useQuery({
        queryKey: ['edit_subscription_membership_plan'],
        queryFn: () => retrieveData(`membership-plan`, header),
    })


    const postMutation = useMutation(
        {
            mutationFn: (data: any) => postData(`membership-plan`, data, header),
            onSuccess: () => {
                toast.success(t('membership_plan_edited_successfully'))
                setOpen(false);
                form.resetFields();
                refetch()
            },
            onError: () => {
                toast.error(t('failed_to_edit_membership_plan'))
            }
        }
    );

    const submitData = (value: any) => {
        const data = {
            id: record.id,
            ...value
        }
        postMutation.mutate(data);
    };

    return (
        <div className=''>
            <SidePanel is_title_row={false} isText={true} open={open} setOpen={setOpen} title={t('edit_subscription')} button_title={<><EditOutlined /> {t('edit')}</>}>
                <Form onFinish={submitData}
                    name="edit_subscription_form"
                    layout="vertical"
                    form={form}
                    initialValues={{ ...record }}
                >

                    <Form.Item label={t('member')} name="member_id"
                        rules={[
                            { required: true, message: t('please_select_member') }
                        ]}
                    >
                        <Select>
                            {userData && userData?.map((user: UserType) => (
                                <Select.Option key={user.id} value={user.id} >{user.first_name} {user.last_name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label={t('membership_plan')} name="membership_plan_id"
                        rules={[
                            { required: true, message: t('please_select_membership_plan') }
                        ]}
                    >
                        <Select>
                            {membershipPlanData && membershipPlanData?.map((membership_plan: MembershipPlanType) => (
                                <Select.Option key={membership_plan.id} value={membership_plan.id} >{membership_plan.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Button
                        htmlType="submit"
                        size='large'
                        className='bg-[#1F677D] dark:bg-boxdark text-white'
                    >{t('save')}</Button>
                </Form>
            </SidePanel>
        </div>)
}
