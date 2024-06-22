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
import { Role } from '../../enums/enums';
import { COMPANY_CATEGORY } from '../../constants/constants';

export default function AddUser({ refetch }: { refetch: Function }) {

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const token = userStore((state: any) => state.token)
    const [role, setRole] = useState()
    const header = {
        Authorization: `Bearer ${token}`,
    }

    const { data: roleData, isPending, error } = useQuery({
        queryKey: ['user_page_role'],
        queryFn: () => retrieveData(`role`, header),
    })



    const postMutation = useMutation(
        {
            mutationFn: (data: any) => postData(`user/create`, data, header),
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
        <div className='py-2 my-2 h-8'> <SidePanel isText={true} open={open} setOpen={setOpen} title={t('user')} button_title={<><PlusOutlined className='mr-2' />{t('add_user')}</>}>
            <Form onFinish={submitData} name="add_user_form" layout="vertical" form={form}>
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
                <Form.Item label={t('role')} name="role_id"
                    rules={[
                        { required: true, message: t('empty_role') }
                    ]}
                >
                    <Select 
                    onChange={(e) => setRole(e)}
                    >
                        {!isPending && roleData?.map((role) => (
                            <Select.Option key={role.id} value={role.id} >{role.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                {role && role == 2 &&

                    <Form.Item label={t('category')} name="company_category"
                        rules={[
                            { required: true, message: t('empty_category') }
                        ]}
                    >
                        <Select>
                            {COMPANY_CATEGORY?.map((item) => (
                                <Select.Option key={item} value={item}>{item}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                }
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
