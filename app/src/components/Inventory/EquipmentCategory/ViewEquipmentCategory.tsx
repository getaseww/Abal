import  { useState } from 'react'
import {Form, Input } from 'antd';
import { t } from 'i18next';
import SidePanel from '../../SidePanel';
import { EyeOutlined } from '@ant-design/icons';
import { EquipmentCategoryType } from '../../../@types/types';

export default function ViewEquipmentCategory({ record }: { record: EquipmentCategoryType }) {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    return (
        <div className=''>
            <SidePanel is_title_row={false} isText={true} open={open} setOpen={setOpen} title={t('view_equipment_category')} button_title={<><EyeOutlined /> {t('view')}</>}>
                <Form onFinish={() => { }}
                    name="view_equipment_category_form"
                    layout="vertical"
                    form={form}
                    initialValues={{ ...record }}
                // disabled={true}
                >

                    <Form.Item label={t('name')} name="name"
                        rules={[
                            { required: true, message: t('empty_name') }
                        ]}
                    >
                        <Input className='p-2' />
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
