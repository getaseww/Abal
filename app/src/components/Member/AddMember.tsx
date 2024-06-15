import React, { useState } from 'react'
import SidePanel from '../SidePanel'
import { Button, Form, Input, InputNumber, Select } from 'antd'
import { postData, retrieveData, searchProp, validatePhoneNumber } from '../../utils/utils'
import { userStore } from '../../store/userStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { t } from 'i18next'
import TextArea from 'antd/es/input/TextArea';
import { PlusOutlined } from '@ant-design/icons';

export default function AddMember({ refetch }: { refetch: Function }) {

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const token = userStore((state: any) => state.token)

    const header = {
        Authorization: `Bearer ${token}`,
    }

    const postMutation = useMutation(
        {
            mutationFn: (data: any) => postData(`user/member/create`, data, header),
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
            user: { ...value },
            profile: { sex: value.sex, address: value.address }
        }
        postMutation.mutate(data);
    };


    return (
        <div className='py-2 h-8'> <SidePanel isText={false} open={open} setOpen={setOpen} title={t('member')} button_title={<><PlusOutlined />{t('member')}</>}>
            <Form onFinish={submitData} name="add_member_form" layout="vertical" form={form}>

                <Form.Item label={t('first_name')} name="first_name"
                    rules={[
                        { required: true, message: t('empty_first_name') }
                    ]}
                >
                    <Input className='p-2' />
                </Form.Item>
                <Form.Item label={t('last_name')} name="last_name"
                    rules={[
                        { required: true, message: t('empty_last_name') }
                    ]}
                >
                    <Input className='p-2' />
                </Form.Item>

                <Form.Item label={t('phone_number')} name="phone_number"
                    rules={[
                        { validator: validatePhoneNumber },
                        { required: true, message: t('empty_last_name') }
                    ]}
                >
                    <Input className='p-2' />
                </Form.Item>

                <Form.Item label={t('sex')} name="sex"
                    rules={[
                        { required: true, message: t('select_sex') }
                    ]}
                >
                    <Select>
                        <Select.Option key="Male" value="Male">Male</Select.Option>
                        <Select.Option key="Female" value="Female">Female</Select.Option>
                    </Select>
                </Form.Item>



                <Form.Item label={t('address')} name="address"
                >
                    <Input className='p-2' />
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
