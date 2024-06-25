import React, { useState } from 'react'
import { MembershipPlanType } from '../../@types/MembershipPlan';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { userStore } from '../../store/userStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { postData, putData, retrieveData, validatePhoneNumber } from '../../utils/utils';
import toast from 'react-hot-toast';
import { t } from 'i18next';
import SidePanel from '../SidePanel';
import TextArea from 'antd/es/input/TextArea';
import { EditOutlined } from '@ant-design/icons';
import { UserType } from '../../@types/User';
import { COMPANY_CATEGORY } from '../../constants/constants';

export default function EditUser({ record, refetch }: { record: UserType, refetch: Function }) {
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
            mutationFn: (data: any) => putData(`user/${data.id}`, data, header),
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
            id: record.id,
            ...value
        }
        postMutation.mutate(data);
    };



    return (
        <div className=''>
            <SidePanel is_title_row={false} isText={true} open={open} setOpen={setOpen} title={t('edit_member')} button_title={<><EditOutlined /> {t('edit')}</>}>
                <Form onFinish={submitData}
                    name="edit_member_form"
                    layout="vertical"
                    form={form}
                    initialValues={{ ...record }}
                >

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
                    <Form.Item label={t('password')} name="password"
                        rules={[
                            // { validator: validatePhoneNumber },
                            { required: true, message: t('empty_password') }
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
        </div>)
}
