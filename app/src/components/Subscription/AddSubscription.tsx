import React, { useState } from 'react'
import SidePanel from '../SidePanel'
import { Button, Form, Input, InputNumber, Select } from 'antd'
import { postData, retrieveData, searchProp } from '../../utils/utils'
import { userStore } from '../../store/userStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { t } from 'i18next'
import TextArea from 'antd/es/input/TextArea';
import { PlusOutlined } from '@ant-design/icons';
import { UserType } from '../../@types/User';
import { MembershipPlanType } from '../../@types/MembershipPlan';

export default function AddSubscription({ refetch }: { refetch: Function }) {

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const token = userStore((state: any) => state.token)

    const header = {
        Authorization: `Bearer ${token}`,
    }

    const { data: userData } = useQuery({
        queryKey: ['add_subscription_user'],
        queryFn: () => retrieveData(`user`, header),
    })

    const { data: membershipPlanData } = useQuery({
        queryKey: ['add_subscription_membership_plan'],
        queryFn: () => retrieveData(`membership-plan`, header),
    })


    const postMutation = useMutation(
        {
            mutationFn: (data: any) => postData(`subscription`, data, header),
            onSuccess: () => {
                toast.success(t('created_successfully'))
                setOpen(false);
                form.resetFields();
                refetch()
            },
            onError: () => {
                toast.error(t('failed_to_create'))
            }
        }
    );

    const submitData = (value: any) => {
        const data = {
            ...value
        }
        postMutation.mutate(data);
    };


    return (
        <div className='py-2 h-8'>
            <SidePanel isText={false} open={open} setOpen={setOpen} title={t('subscription')} button_title={<><PlusOutlined />{t('subscription')}</>}>
                <Form onFinish={submitData} name="add_subscription_form" layout="vertical" form={form}>

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
        </div>
    )
}
