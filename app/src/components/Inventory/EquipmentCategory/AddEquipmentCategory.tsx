import { useState } from 'react'
import SidePanel from '../../SidePanel'
import { Button, Form, Input } from 'antd'
import { postData } from '../../../utils/utils'
import { userStore } from '../../../store/userStore';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { t } from 'i18next'
import { PlusOutlined } from '@ant-design/icons';

export default function AddEquipmentCategory({ refetch }: { refetch: Function }) {

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const token = userStore((state: any) => state.token)

    const header = {
        Authorization: `Bearer ${token}`,
    }



    const postMutation = useMutation(
        {
            mutationFn: (data: any) => postData(`inventory/equipment-category`, data, header),
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
        <div className='py-2 h-8'> <SidePanel isText={false} open={open} setOpen={setOpen} title={t('equipment_category')} button_title={<><PlusOutlined />{t('equipment_category')}</>}>
            <Form onFinish={submitData} name="add_equipment_category_form"
                layout="vertical" form={form}>

                <Form.Item label={t('name')} name="name"
                    rules={[
                        { required: true, message: t('empty_name') }
                    ]}
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
