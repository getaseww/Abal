import { useState } from 'react'
import SidePanel from '../../SidePanel'
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd'
import { postData, retrieveData, searchProp } from '../../../utils/utils'
import { userStore } from '../../../store/userStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { t } from 'i18next'
import { PlusOutlined } from '@ant-design/icons';
import { EquipmentCondition, EquipmentStatus } from '../../../enums/enums';

export default function AddEquipment({ refetch }: { refetch: Function }) {

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const token = userStore((state: any) => state.token)

    const header = {
        Authorization: `Bearer ${token}`,
    }

    const { data } = useQuery({
        queryKey: ['add_page_equipment_category'],
        queryFn: () => retrieveData(`inventory/equipment-category`, header),
    })

    const postMutation = useMutation(
        {
            mutationFn: (data: any) => postData(`inventory/equipment`, data, header),
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
        <div className='py-2 h-8'> <SidePanel isText={false} open={open} setOpen={setOpen} title={t('equipment')} button_title={<><PlusOutlined className='pr-2'/>{t('add_equipment')}</>}>
            <Form onFinish={submitData} name="add_equipment_form"
                layout="vertical" form={form}>

                <Form.Item label={t('name')} name="name"
                    rules={[
                        { required: true, message: t('empty_name') }
                    ]}
                >
                    <Input className='p-2' />
                </Form.Item>
                <Form.Item label={t('category')} name="equipment_category_id"
                    rules={[
                        { required: true, message: t('empty_category') }
                    ]}
                >
                    <Select {...searchProp}>
                        {data && data.map((item: any) => (
                            <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label={t('brand')} name="brand"

                >
                    <Input className='p-2' />
                </Form.Item>

                <Form.Item label={t('model')} name="model"
                >
                    <Input className='p-2' />
                </Form.Item>
                <Form.Item label={t('serial_number')} name="serial_number"
                >
                    <Input className='p-2' />
                </Form.Item>
                <Form.Item label={t('purchase_date')} name="purchase_date"
                >
                    <DatePicker className='p-2 w-full' />
                </Form.Item>

                <Form.Item label={t('price')} name="price"
                >
                    <InputNumber className='p-2 w-full' />
                </Form.Item>
                <Form.Item label={t('location')} name="location"
                >
                    <Input className='p-2 w-full' />
                </Form.Item>


                <Form.Item label={t('status')} name="status"

                >
                    <Select>
                        <Select.Option key={EquipmentStatus.AVAILABLE} value={EquipmentStatus.AVAILABLE}>{EquipmentStatus.AVAILABLE}</Select.Option>
                        <Select.Option key={EquipmentStatus.INUSE} value={EquipmentStatus.INUSE}>{EquipmentStatus.INUSE}</Select.Option>
                        <Select.Option key={EquipmentStatus.MAINTENANCE} value={EquipmentStatus.MAINTENANCE}>{EquipmentStatus.MAINTENANCE}</Select.Option>
                        <Select.Option key={EquipmentStatus.RETIRED} value={EquipmentStatus.RETIRED}>{EquipmentStatus.RETIRED}</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label={t('condition')} name="condition"

                >
                    <Select>
                        <Select.Option key={EquipmentCondition.NEW} value={EquipmentCondition.NEW}>{EquipmentCondition.NEW}</Select.Option>
                        <Select.Option key={EquipmentCondition.GOOD} value={EquipmentCondition.GOOD}>{EquipmentCondition.GOOD}</Select.Option>
                        <Select.Option key={EquipmentCondition.FAIR} value={EquipmentCondition.FAIR}>{EquipmentCondition.FAIR}</Select.Option>
                        <Select.Option key={EquipmentCondition.POOR} value={EquipmentCondition.POOR}>{EquipmentCondition.POOR}</Select.Option>
                    </Select>
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
