import React, { useState } from 'react'
import { MembershipPlanType } from '../../@types/MembershipPlan';
import { Button, Form, Input, InputNumber } from 'antd';
import { userStore } from '../../store/userStore';
import { useMutation } from '@tanstack/react-query';
import { postData } from '../../utils/utils';
import toast from 'react-hot-toast';
import { t } from 'i18next';
import SidePanel from '../SidePanel';
import TextArea from 'antd/es/input/TextArea';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';

export default function ViewMembershipPlan({ record }: { record: MembershipPlanType }) {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    return (
        <div className=''>
            <SidePanel is_title_row={true} isText={false} open={open} setOpen={setOpen} title={t('view_membership_plan')} button_title={<><EyeOutlined /></>}>
                <Form onFinish={() => { }}
                    name="view_membership_form"
                    layout="vertical"
                    form={form}
                    initialValues={{ ...record }}
                    // disabled={true}
                >

                    <Form.Item label={t('name')} name="name"
                        rules={[
                            { required: true, message: t('empty_memebership_name') }
                        ]}
                    >
                        <Input readOnly className='p-2' />
                    </Form.Item>
                    <Form.Item label={t('duration_in_month')} name="duration"
                        rules={[
                            { required: true, message: t('empty_duration') }
                        ]}
                    >
                        <InputNumber readOnly className='p-1 w-full' />
                    </Form.Item>
                    <Form.Item
                        label={t('access_per_week')}
                        name="access_level"
                        rules={[
                            { required: true, message: t('empty_access') }
                        ]}
                    >
                        <InputNumber readOnly max={7} min={1} className='p-1 w-full' />
                    </Form.Item>

                    <Form.Item
                        label={t('price')}
                        name="price"
                        rules={[
                            { required: true, message: t('empty_price') }
                        ]}
                    >
                        <InputNumber readOnly max={7} min={1} className='p-1 w-full' />
                    </Form.Item>
                    <Form.Item label={t('max_member')} name="max_member"
                    >
                        <InputNumber  readOnly className='w-full p-1' />
                    </Form.Item>
                    <Form.Item label={t('description')} name="description"
                    >
                        <TextArea  readOnly className='w-full p-1' />
                    </Form.Item>

                    {/* <Button
                        htmlType="submit"
                        size='large'
                        className='bg-[#1F677D] dark:bg-boxdark text-white'
                    >{t('save')}</Button> */}
                </Form>
            </SidePanel>
        </div>)
}
