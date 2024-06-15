import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { SearchProps } from 'antd/es/input/Search';
import CustomModal from '../../../components/Modal/index.tsx';
import { useMutation } from '@tanstack/react-query';
import { postData, putData } from '../../../utils/utils.ts';
import toast from 'react-hot-toast';
import TextArea from 'antd/es/input/TextArea';
import { t } from 'i18next';
import { EditSubscriptionPropType } from './type.ts';
import { userStore } from '../../../store/userStore.ts';

const EditSubscription: React.FC<EditSubscriptionPropType> = ({ data, refetch }) => {

    const [form] = Form.useForm();
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const token = userStore((state: any) => state.token)


    const header = {
        Authorization: `Bearer ${token}`,
    }

    const updateMutation = useMutation(
        {
            mutationFn: (subscriptionData: any) => postData(`sms/subscription`, subscriptionData, header),
            onSuccess: () => {
                toast.success(`${t('subscription_successful_update')}`)
                setOpenEdit(false);
                refetch()
            },
            onError: () => {
                toast.error(`${t('subscription_failed_update')}`)
            }
        }
    );



    const submitData = (value: any) => {
        // const subscriptionData = {
        //     id: data.id,
        //     amount: Number(data.amount),
        //     quantity: Number(data.quantity),
        // }
        console.log("sub data",data);
        
        updateMutation.mutate(data);
    };

    const handleOk = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        submitData
        form.resetFields();
        setOpenEdit(false);

    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        form.resetFields();
        setOpenEdit(false);
    };


    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    return (
        <>
            <div className='flex flex-col'>
                <Button type="text" onClick={() => setOpenEdit(true)}>{t('edit')}</Button>
                <CustomModal open={openEdit} title={t('package_edit_package')} handleCancel={handleCancel} handleOk={handleOk}
                    footer={<><Button className="btn-outline" htmlType="reset" onClick={handleCancel}>
                        {t('cancel')}
                    </Button>
                        <Button
                            className="bg-[#1F677D] dark:bg-boxdark"
                            key="submit"
                            type="primary"
                            htmlType="submit"
                            onClick={() => form.submit()}
                        >
                            {t('save')}
                        </Button></>}
                >
                    <Form onFinish={submitData}
                        name="form_item_path"
                        layout="vertical"
                        form={form}
                        initialValues={{ ...data }}
                    >
                        <div className='row'>
                            <Form.Item label={t('package_name')} name="name" rules={[
                                {
                                    required: true,
                                    message: `${t('package_required')}`,
                                }]}>
                                <Input className='p-2' />
                            </Form.Item>
                            <Form.Item label={t('package_description')} name="description">
                                <TextArea className='p-2' />
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
                        </div>
                    </Form>
                </CustomModal>
            </div>
        </>
    );
};
export default EditSubscription;