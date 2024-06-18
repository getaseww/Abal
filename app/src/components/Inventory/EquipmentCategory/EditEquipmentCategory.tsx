import { useState } from 'react'
import { Button,Form, Input} from 'antd';
import { userStore } from '../../../store/userStore';
import { useMutation } from '@tanstack/react-query';
import { postData } from '../../../utils/utils';
import toast from 'react-hot-toast';
import { t } from 'i18next';
import SidePanel from '../../SidePanel';
import { EditOutlined } from '@ant-design/icons';
import { EquipmentCategoryType } from '../../../@types/types';

export default function EditEquipmentCategory({ record, refetch }: { record: EquipmentCategoryType, refetch: Function }) {
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
            id: record.id,
            ...value
        }
        postMutation.mutate(data);
    };


    return (
        <div className=''>
            <SidePanel is_title_row={false} isText={true} open={open} setOpen={setOpen} title={t('edit_equipment_category')} button_title={<><EditOutlined /> {t('edit')}</>}>
                <Form onFinish={submitData}
                    name="edit_equipment_category_form"
                    layout="vertical"
                    form={form}
                    initialValues={{ ...record }}
                >

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
        </div>)
}
