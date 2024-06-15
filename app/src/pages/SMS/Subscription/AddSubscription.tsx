
import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Input, Row, message } from 'antd';
import CustomModal from '../../../components/Modal/index.tsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { formatNumber, postData, retrieveData } from '../../../utils/utils.ts';
import toast from 'react-hot-toast';
import TextArea from 'antd/es/input/TextArea';
import { AddSubscriptionPropType, SubscriptionType } from './type.ts';
import { userStore } from '../../../store/userStore.ts';
import { t } from 'i18next';
import { PackageType } from '../Package/type.ts';
import { Role } from '../../../enums/generalEnums.ts';


const AddSubscription: React.FC<AddSubscriptionPropType> = ({ refetch }) => {

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [openMessage, setOpenMessage] = useState(false);
    const [unapproved, setUnapproved] = useState(false);
    const token = userStore((state: any) => state.token);

    const [query, setQuery] = useState();

    const header = {
        Authorization: `Bearer ${token}`,
    }


    const { data: packageData, isPending, error } = useQuery({
        queryKey: ['package'],
        queryFn: () => retrieveData(`sms/package?name=${query}`, header),
        refetchOnWindowFocus: true,
    })

    const user = userStore((state: any) => state.user);

    const { data: subscriptionData } = useQuery({
        queryKey: ['smssubscription'],
        queryFn: () => retrieveData(`sms/subscription?name=${query}`, header),
    })
    useEffect(() => {
        if (JSON.parse(user)?.role != Role.ADMIN && open == false && subscriptionData?.filter((item: SubscriptionType) => item.is_approved == false)?.length > 0) {
            setOpenMessage(true)
            setUnapproved(true);
        }
    }, [subscriptionData])

    const postMutation = useMutation(
        {
            mutationFn: (data: any) => postData(`sms/subscription`, data, header),
            onSuccess: () => {
                toast.success(`${t('subscription_successful_register')}`)
                setOpen(false);
                form.resetFields();
                refetch()
            },
            onError: () => {
                toast.error(`${t('subscription_failed_register')}`)
            }
        }
    );

    const submitData = (data: PackageType) => {
        const newData = {
            package_id: data.id,
            amount: Number(data.price),
            quantity: Number(data.quantity),
        }
        postMutation.mutate(newData);
    };

    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'This is a prompt message with custom className and style',
            className: 'custom-class',
            style: {
                marginTop: '20vh',
            },
        });
    };

    const handleOk = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        submitData
        form.resetFields();
        setOpen(false);
        success();
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        form.resetFields();
        setOpen(false);
    };

    const handleMessageOk = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setOpenMessage(false);
    };

    const handleMessageCancel = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setOpenMessage(false);
    };


    return (
        <>
            <div className='flex flex-col'>
                <Button className='bg-[#1F677D] dark:bg-boxdark text-white' onClick={() => { unapproved ? setOpenMessage(true) : setOpen(true) }}>{t('add_subscription')}</Button>
                <CustomModal open={open} title={t('add_subscription')} handleCancel={handleCancel} handleOk={handleOk}
                    footer={<><Button className="btn-outline" htmlType="reset" onClick={handleOk}>
                        {t('cancel')}
                    </Button>
                        {/* <Button
                            className="bg-[#1F677D] dark:bg-boxdark"
                            key="submit"
                            type="primary"
                            htmlType="submit"
                            onClick={() => form.submit()}
                        >
                            {t('save')}
                        </Button> */}
                    </>
                    }
                >
                    {/* <Form onFinish={submitData} name="add_subscription_form" layout="vertical" form={form}>       
                    </Form> */}

                    <Row gutter={16}>
                        {packageData && packageData?.map((pack: PackageType) => (
                            <Col xs={24} sm={24} md={8} lg={8} className='mt-6'>

                                <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg">
                                    <div className="px-6 py-4">
                                        <div className="text-black text-center font-bold text-xl text-transform: uppercase mb-2">{pack?.name}</div>
                                        <p className="text-black text-center pt-4 font-extrabold italic text-4xl text-base">{formatNumber(pack?.price)} Birr</p>
                                    </div>
                                    <div className="px-6 py-4 flex">
                                        <ul className="">
                                            <li key="jkfdjfdk" className="mb-2 flex flex-row items-center p-2 m-2 text-black text-lg ">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    height="16" width="14" viewBox="0 0 448 512"
                                                    className='mr-3 text-[#22C55E]'
                                                >
                                                    <path className='text-[#22C55E]' d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                                                {formatNumber(pack.quantity)} Total SMS
                                            </li>
                                            {pack.description?.split(",").map((feature, index) => (
                                                <li key={index} className="mb-2 flex  items-center p-2 m-2 text-black text-lg ">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        height="16" width="14" viewBox="0 0 448 512"
                                                        className='mr-3 text-[#22C55E]'
                                                    >
                                                        <path className='text-[#22C55E]' d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="px-6 py-4 w-full">
                                        <button
                                            onClick={() => submitData(pack)}
                                            className="w-full bg-[#8334eb] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Subscribe
                                        </button>
                                    </div>
                                </div>
                            </Col>
                        ))}

                    </Row>
                </CustomModal>
                <CustomModal open={openMessage} title={t('pay_subscription_payment')} handleCancel={handleMessageCancel} handleOk={handleMessageOk}
                    footer={<><Button className="btn-outline" htmlType="reset" onClick={handleMessageOk}>
                        {t('accept')}
                    </Button>
                    </>
                    }
                >
                    <Row gutter={16}>
                        <div className="">
                            <h2 className="text-2xl text-black font-bold mb-4">{t('subscription_unapproved')}</h2>
                            <p className="text-black  text-lg mb-6">{t('subscription_payment_message')}</p>
                            <p className="text-black text-lg font-bold mb-6">{t('cbe')} <span className='text-[#C026D3]'>1000432537491 </span> {t('efoyplus')}</p>
                            <p className="text-black text-lg mb-6">{t('tg_account_subscription_message')}</p>
                            <p className="text-black text-lg mb-6 flex items-center">{t('telegram_contact')}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="20"
                                    width="20"
                                    viewBox="0 0 496 512"
                                    className='mx-4'
                                    >
                                    <path fill='#30A7DF' d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" /></svg>
                                <a href="https://t.me/MeronJafar" className="text-[#1A8AD5]" target="_blank">Meron Jafar</a></p>
                        </div>
                    </Row>
                </CustomModal>
            </div>
        </>
    );
};

export default AddSubscription;
