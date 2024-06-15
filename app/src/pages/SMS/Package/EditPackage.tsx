import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { SearchProps } from 'antd/es/input/Search';
import CustomModal from '../../../components/Modal/index.tsx';
import { useMutation } from '@tanstack/react-query';
import { putData } from '../../../utils/utils.ts';
import toast from 'react-hot-toast';
import TextArea from 'antd/es/input/TextArea';
import { t } from 'i18next';
import { EditPackagePopType } from './type.ts';
import { userStore } from '../../../store/userStore.ts';
import SidePanel from '../../../components/SidePanel.tsx';



const EditPackage: React.FC<EditPackagePopType> = ({ data, refetch }) => {

    const [form] = Form.useForm();
    const token = userStore((state: any) => state.token)
    const [open, setOpen] = useState<boolean>(false)


    const header = {
        Authorization: `Bearer ${token}`,
    }

    const updateMutation = useMutation(
        {
            mutationFn: (packagedata: any) => putData(`sms/package/${data.id}`, packagedata, header),
            onSuccess: () => {
                toast.success(`${t('package_successful_update')}`)
                form.resetFields()
                setOpen(false);
                refetch()
            },
            onError: () => {
                toast.error(`${t('package_failed_update')}`)
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
        updateMutation.mutate(data);
    };

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    return (
        <>
            <SidePanel isText={false} open={open} setOpen={setOpen} button_title={t('edit')} title={t('edit')}>
                <Form
                    onFinish={submitData}
                    name="form_item_path"
                    layout="vertical" form={form}
                    initialValues={{ ...data }}
                >
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
export default EditPackage;