import React, { useState } from 'react'
import { MembershipPlanType } from '../../@types/MembershipPlan';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { userStore } from '../../store/userStore';
import { useMutation } from '@tanstack/react-query';
import { postData, validatePhoneNumber } from '../../utils/utils';
import toast from 'react-hot-toast';
import { t } from 'i18next';
import SidePanel from '../SidePanel';
import TextArea from 'antd/es/input/TextArea';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';

export default function ViewMember({ record }: { record: MembershipPlanType }) {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    return (
        <div className=''>
            <SidePanel is_title_row={true} isText={false} open={open} setOpen={setOpen} title={t('view_member')} button_title={<><EyeOutlined /></>}>
                <Form onFinish={() => { }}
                    name="view_member_form"
                    layout="vertical"
                    form={form}
                    initialValues={{ ...record }}
                // disabled={true}
                >

                    <Form.Item label={t('first_name')} name="first_name"
                        rules={[
                            { required: true, message: t('empty_first_name') }
                        ]}
                    >
                        <Input  readOnly className='p-2' />
                    </Form.Item>
                    <Form.Item label={t('last_name')} name="last_name"
                        rules={[
                            { required: true, message: t('empty_last_name') }
                        ]}
                    >
                        <Input readOnly className='p-2' />
                    </Form.Item>

                    <Form.Item label={t('phone_number')} name="phone_number"
                        rules={[
                            { validator: validatePhoneNumber },
                            { required: true, message: t('empty_last_name') }
                        ]}
                    >
                        <Input readOnly className='p-2' />
                    </Form.Item>

                    <Form.Item label={t('sex')} name="sex"
                        rules={[
                            { required: true, message: t('select_sex') }
                        ]}
                    >
                        <Select disabled>
                            <Select.Option key="Male" value="Male">Male</Select.Option>
                            <Select.Option key="Female" value="Female">Female</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label={t('address')} name="address"
                    >
                        <Input readOnly className='p-2' />
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
