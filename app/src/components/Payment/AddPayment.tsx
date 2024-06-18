import React, { useEffect, useState } from 'react'
import SidePanel from '../SidePanel'
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd'
import { generateRandomString, postData, retrieveData, searchProp } from '../../utils/utils'
import { userStore } from '../../store/userStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { t } from 'i18next'
import TextArea from 'antd/es/input/TextArea';
import { PlusOutlined } from '@ant-design/icons';
import { UserType } from '../../@types/User';
import { MembershipPlanType } from '../../@types/MembershipPlan';
import { SubscriptionType } from '../../@types/Subscription';
import dayjs from 'dayjs';

export default function AddPayment({ refetch }: { refetch: Function }) {

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const token = userStore((state: any) => state.token)
    const [user_id, setUserId] = useState(null)
    const [amount, setAmount] = useState(null)
    const header = {
        Authorization: `Bearer ${token}`,
    }

    const { data: userData } = useQuery({
        queryKey: ['add_payment_user'],
        queryFn: () => retrieveData(`user`, header),
    })

    const { data: subscriptionData, refetch: refetchSubscription } = useQuery({
        queryKey: ['add_payment_subscriptionp'],
        queryFn: () => retrieveData(`subscription?member_id=${user_id}`, header),
    })

    const handleSubscriptionChange = (subscription_id: number) => {
        console.log("clicked", subscription_id)
        const selectedSubscription = subscriptionData.find((subscription: any) => subscription.id == subscription_id);
        console.log("clicked data", selectedSubscription)
        if (selectedSubscription) {
            setAmount(selectedSubscription.membership_plan.price); // Assuming 'amount' is the correct field for the amount
        }
    };

    useEffect(() => {
        refetchSubscription()
    }, [user_id])

    useEffect(() => {
        form.setFieldValue('amount', amount)
    }, [amount])


    const postMutation = useMutation(
        {
            mutationFn: (data: any) => postData(`payment`, data, header),
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
            ...value,
            trx_ref: generateRandomString(12)
        }
        postMutation.mutate(data);
    };


    return (
        <div className='py-2 h-8'>
            <SidePanel isText={false} open={open} setOpen={setOpen} title={t('payment')} button_title={<><PlusOutlined />{t('payment')}</>}>
                <Form
                    onFinish={submitData}
                    name="add_payment_form"
                    layout="vertical" form={form}
                    initialValues={{ date: dayjs() }}
                >

                    <Form.Item label={t('member')} name="member_id"
                        rules={[
                            { required: true, message: t('please_select_member') }
                        ]}
                    >
                        <Select onChange={(e) => setUserId(e)}>
                            {userData && userData?.map((user: UserType) => (
                                <Select.Option key={user.id} value={user.id} >{user.first_name} {user.last_name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label={t('payment_date')} name="date"
                        rules={[
                            { required: true, message: t('please_select_date') }
                        ]}
                    >
                        <DatePicker.MonthPicker className='w-full' />
                    </Form.Item>
                    <Form.Item label={t('subscribed_membership_plan')} name="subscription_id"
                        rules={[
                            { required: true, message: t('please_select_subscription') }
                        ]}
                    >
                        <Select onChange={handleSubscriptionChange} >
                            {subscriptionData && subscriptionData?.map((subscription: SubscriptionType) => (
                                <Select.Option key={subscription.id} value={subscription.id} >{subscription.membership_plan?.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label={t('amount')} name="amount"
                        rules={[
                            { required: true, message: t('empty_amount') }
                        ]}
                    >
                        <InputNumber readOnly className='w-full p-1' />
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
