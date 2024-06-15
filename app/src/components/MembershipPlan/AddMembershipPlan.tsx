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

export default function AddMembershipPlan({ refetch }: { refetch: Function }) {

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const token = userStore((state: any) => state.token)

    const header = {
        Authorization: `Bearer ${token}`,
    }


    const postMutation = useMutation(
        {
            mutationFn: (data: any) => postData(`membership-plan`, data, header),
            onSuccess: () => {
                toast.success(t('membership_plan_added_successfully'))
                setOpen(false);
                form.resetFields();
                refetch()
            },
            onError: () => {
                toast.error(t('failed_to_add_membership_plan'))
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
            <SidePanel isText={false} open={open} setOpen={setOpen} title={t('membership_plan')} button_title={<><PlusOutlined />{t('membership_plan')}</>}>
                <Form onFinish={submitData} name="form_item_path" layout="vertical" form={form}>

                    <Form.Item label={t('name')} name="name"
                        rules={[
                            { required: true, message: t('empty_memebership_name') }
                        ]}
                    >
                        <Input className='p-2' />
                    </Form.Item>
                    <Form.Item label={t('duration_in_month')} name="duration"
                        rules={[
                            { required: true, message: t('empty_duration') }
                        ]}
                    >
                        <InputNumber className='p-1 w-full' />
                    </Form.Item>
                    <Form.Item
                        label={t('access_per_week')}
                        name="access_level"
                        rules={[
                            { required: true, message: t('empty_access') }
                        ]}
                    >
                        <InputNumber max={7} min={1}  className='p-1 w-full'/>
                    </Form.Item>

                    <Form.Item
                        label={t('price')}
                        name="price"
                        rules={[
                            { required: true, message: t('empty_price') }
                        ]}
                    >
                        <InputNumber max={7} min={1} className='p-1 w-full'/>
                    </Form.Item>
                    <Form.Item label={t('max_member')} name="max_member"
                    >
                        <InputNumber className='w-full p-1' />
                    </Form.Item>
                    <Form.Item label={t('description')} name="description"
                    >
                        <TextArea className='w-full p-1' />
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
