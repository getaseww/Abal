
import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import CustomModal from '../../../components/Modal/index.tsx';
import { useMutation } from '@tanstack/react-query';
import { postData } from '../../../utils/utils.ts';
import toast from 'react-hot-toast';
import TextArea from 'antd/es/input/TextArea';
import { AddPackagePopType } from './type.ts';
import { userStore } from '../../../store/userStore.ts';
import { t } from 'i18next';
import SidePanel from '../../../components/SidePanel.tsx';


const AddPackage: React.FC<AddPackagePopType> = ({ refetch }) => {

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const token = userStore((state: any) => state.token)

    const header = {
        Authorization: `Bearer ${token}`,
    }
    const postMutation = useMutation(
        {
            mutationFn: (data: any) => postData(`sms/package`, data, header),
            onSuccess: () => {
                toast.success(`${t('package_successful_register')}`)
                setOpen(false);
                form.resetFields();
                refetch()
            },
            onError: () => {
                toast.error(`${t('package_failed_register')}`)
            }
        }
    );

    const submitData = (value: any) => {
        const data = {
            name: value.name,
            description: value.description,
            price: Number(value.price),
            quantity: Number(value.quantity),
        }
        postMutation.mutate(data);
    };

    return (
        <>

            <SidePanel isText={false} open={open} setOpen={setOpen} button_title={t('add_package')} title={t('add_package')}>
                <Form onFinish={submitData} name="form_item_path" layout="vertical" form={form}>
                        <Form.Item label={t('package_name')} name="name" rules={[
                            {
                                required: true,
                                message: `${t('package_required')}`,
                            }]}>
                            <Input className='p-2' />
                        </Form.Item>

                        <Form.Item label={t('package_price')} name="price" rules={[
                            {
                                required: true,
                                message: `${t('package_required_price')}`,
                            }]}>
                            <Input type="number" className='p-2' />
                        </Form.Item>
                        <Form.Item label={t('package_quantity')} name="quantity" rules={[
                            {
                                required: true,
                                message: `${t('package_required_quantity')}`,
                            }]}>
                            <Input type="number" className='p-2' />
                        </Form.Item>
                        <Form.Item label={t('feature')} name="description">
                            <TextArea className='p-2' />
                        </Form.Item>
                        <Button
                            htmlType="submit"
                            size='large'
                            className='bg-[#1F677D] dark:bg-boxdark text-white'
                        >{t('submit')}</Button>
                </Form>
            </SidePanel>
        </>
    );
};

export default AddPackage;
