import React, { useState } from 'react'
import { MembershipPlanType } from '../../../@types/MembershipPlan';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { userStore } from '../../../store/userStore';
import { useMutation } from '@tanstack/react-query';
import { postData, validatePhoneNumber } from '../../../utils/utils';
import toast from 'react-hot-toast';
import { t } from 'i18next';
import SidePanel from '../../SidePanel';
import TextArea from 'antd/es/input/TextArea';
import { EditOutlined } from '@ant-design/icons';
import { UserType } from '../../../@types/User';

export default function EditMember({ record, refetch }: { record: UserType, refetch: Function }) {
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
                toast.success(t('updated_successfully'))
                setOpen(false);
                form.resetFields();
                refetch()
            },
            onError: () => {
                toast.error(t('failed_to_update'))
            }
        }
    );

    const submitData = (value: any) => {
        const data = {
            user: {
                ...value, id: record.id,
            },
            profile: { id: record?.profile?.id, sex: value.sex, address: value.address }
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
        </div>)
}
