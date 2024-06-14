import React, { useState } from 'react'
import {Form,Input,Button} from 'antd'
import { userStore } from '../store/userStore';
import {useMutation} from '@tanstack/react-query'
import { postData, validatePhoneNumber } from '../utils/utils';
import toast from 'react-hot-toast';
import {t} from 'i18next'
import CustomModal from '../components/Modal';
import { BUTTON_BACKGROUND } from '../constants/constants';
export default function Login() {
    const [form] = Form.useForm();
    const [form2] = Form.useForm();

    const [forget_phone_number, setFogetPhoneNumber] = useState();

    const { saveToken, saveUser } = userStore((state: any) => state)

    const login = useMutation(
        {
            mutationFn: (loginData: any) => postData(`user/login`, loginData),
            onSuccess: (data) => {
                const { token, ...newData } = data;
                saveToken(token)
                saveUser(JSON.stringify(newData))
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(newData))
            },
            onError: (error) => {
                toast.error(t('failed_to_login') + error)
            }
        }
    );

    const forget = useMutation(
        {
            mutationFn: (data: any) => postData(`user/forget-password`, data),
            onSuccess: (data) => {
                setOpen(false);
                toast.success(`password_reset_link_sent`)
            },
            onError: (error) => {
                toast.error(t('failed_to_forget_password') + error)
            }
        }
    );


    const submitData = (value: any) => {
        const loginData = {
            phone_number: value.phone_number,
            password: value.password
        }
        login.mutate(loginData);
    };


    const handleForget = (value: any) => {
        const data = { phone_number: value.forget_phone_number }
        forget.mutate(data)
    }

    const [open, setOpen] = useState(false);

    const handleOk = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        form.resetFields();
        setOpen(false);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        form.resetFields();
        setOpen(false);
    };


    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-[#C81E21] to-[#e42125] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Login</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                                <Form onFinish={submitData} name="login_form" layout="vertical" form={form}>
                                    <Form.Item label={t('phone_number')} name="phone_number"
                                        rules={[
                                            { required: true, message: t("phone_number_empty_message") },
                                        ]}
                                    >
                                        <Input className='p-2' type='text' />
                                    </Form.Item>
                                    <Form.Item
                                        label={t('password')}
                                        name="password"
                                        rules={[
                                            { required: true, message: t("empty_password_message") },
                                        ]}
                                    >
                                        <Input.Password className='p-2' />
                                    </Form.Item>

                                    <p className='pb-5 text-[#4096FF] hover:text-[#33e3ff] cursor-pointer' onClick={() => setOpen(true)}>{t("forget_password")}</p>
                                    <CustomModal width={700} title={t('reset_password')} open={open} handleCancel={handleCancel} handleOk={handleOk} >
                                        <Form form={form2} onFinish={handleForget} layout='vertical'>
                                            <Form.Item
                                                label={t('phone_number')}
                                                name="forget_phone_number"
                                                rules={[
                                                    { required: true, message: t("phone_number_empty_message") },
                                                    { validator: validatePhoneNumber },

                                                ]}
                                            >
                                                <Input className='p-2' />
                                            </Form.Item>
                                            <Button htmlType='submit' size='large' className='w-full bg-[#1F677D] text-white '>{t('reset_password')}</Button>
                                        </Form>
                                    </CustomModal>
                                    <Button
                                        onClick={() => form.submit()}
                                        className={`w-full inline-block h-13 align-middle text-white ${BUTTON_BACKGROUND}`}>{t('login')}</Button>
                                </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}
