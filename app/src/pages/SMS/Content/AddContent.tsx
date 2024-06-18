
import { useEffect, useState } from 'react';
import { Button, Col, ColorPicker, Form, Input, Row, Select } from 'antd';
import CustomModal from '../../../components/Modal/index.tsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { checkUnicode, postData, retrieveData, searchProp } from '../../../utils/utils.ts';
import toast from 'react-hot-toast';
import TextArea from 'antd/es/input/TextArea';
import { AddContentPopType } from './type.ts';
import { userStore } from '../../../store/userStore.ts';
import { t } from 'i18next';
import { ColumnsType } from 'antd/es/table/interface';
import CustomTable from '../../../components/Table/CustomTable.tsx';
import Search, { SearchProps } from 'antd/es/input/Search';
import { Role, SMSSTATUS } from '../../../enums/generalEnums.ts';
import { UserType } from '../../../@types/User';


const AddContent: React.FC<AddContentPopType> = ({ refetch }) => {

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const token = userStore((state: any) => state.token)
    const [phoneNumbers, setPhoneNumbers] = useState<string[]>([])
    const user: any = JSON.parse(userStore((state: any) => state.user))

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState<string | null>();

    const header = {
        Authorization: `Bearer ${token}`,
    }


    const { data: balanceDatas } = useQuery({
        queryKey: ['sms_balance'],
        queryFn: () => retrieveData("sms/balance", header),
    })

    const { data: memberData, isPending, error } = useQuery({
        queryKey: ['sms_content_members'],
        queryFn: () => retrieveData(`user`, header),
    })


    var activeBalance: number = 0;




    if (balanceDatas != null && balanceDatas != undefined && balanceDatas.length > 0)
        activeBalance = Number(balanceDatas[0].balance) - Number(balanceDatas[0].used);

    const postMutation = useMutation(
        {
            mutationFn: (data: any) => postData(`sms/content`, data, header),
            onSuccess: () => {
                toast.success(`${t('content_successful_register')}`)
                setOpen(false);
                setSelectedRowKeys([])
                form.resetFields();
                refetch()
            },
            onError: () => {
                toast.error(`${t('content_failed_register')}`)
            }
        }
    );

    const submitData = (value: any) => {
        if (selectedRowKeys.length === 0) {
            // No rows selected, handle the error or show a message
            toast.error(`${t('content_required_respondents')}`);
            return;
        }
        let count_sms;
        if (checkUnicode(value.body)) {
            count_sms = Math.ceil(value.body.length / 70);
        } else {
            count_sms = Math.ceil(value.body.length / 160)
        }
        const numberOfResidents = selectedRowKeys.length;

        // Check if the active balance is sufficient
        if ((numberOfResidents * count_sms) > activeBalance) {
            // Display an error message if the active balance is insufficient
            toast.error(`${t('insufficient_balance')}`);
            return;
        }

        const data = {
            phone_numbers: String(phoneNumbers),
            body: value.body,
            title: value.title,
            status: SMSSTATUS.PENDING,
            resident_type: String(value.resident_type)
            // body: value.body,
        }
        postMutation.mutate(data);
    };
    const handleOk = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        submitData
        setSelectedRowKeys([])
        form.resetFields();
        setOpen(false);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        form.resetFields();
        setOpen(false);
    };

    const columns: ColumnsType<UserType> = [
        {
            title: `${t('full_name')}`,
            key: 'full_name',
            render:(value,record)=><>{record.first_name} {record.last_name}</>
        },
        {
            title: `${t('phone_number')}`,
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
    ];

    const [characterCount, setCharacterCount] = useState(0);



    const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const body = e.target.value;
        let count_sms;
        if (checkUnicode(body)) {
            count_sms = Math.ceil(body.length / 70);
        } else {
            count_sms = Math.ceil(body.length / 160)
        }
        setCharacterCount(count_sms);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };


    useEffect(() => {
        setPhoneNumbers([])
        console.log("select keys " + JSON.stringify(selectedRowKeys))
        selectedRowKeys.map((key) => {
            const res = memberData?.filter((item: any, index: number) => key == index)
            console.log("response" + JSON.stringify(res))
            // if (!phoneNumbers.includes(res[0]?.user?.phone_number)) {
            setPhoneNumbers((prev) => [...prev, res[0]?.phone_number])
            // }
        })
    }, [selectedRowKeys])

    console.log("phone ", phoneNumbers)
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    useEffect(() => {
        // refetchUserData();
    }, [query])

    return (
        <>
            <div className='flex flex-col'>
                {/* {user.role == Role.COMMUNITY && <Button className='bg-[#1F677D] dark:bg-boxdark text-white' onClick={() => setOpen(true)}>{t('content_compose_sms')}</Button>} */}
                <Button className='bg-[#1F677D] dark:bg-boxdark text-white' onClick={() => setOpen(true)}>{t('content_compose_sms')}</Button>
                <CustomModal open={open} title={t('content_compose_sms')} handleCancel={handleCancel} handleOk={handleOk}
                    footer={<><Button className="btn-outline" htmlType="reset" onClick={handleOk}>
                        {t('cancel')}
                    </Button>
                        <Button
                            className="bg-[#1F677D] dark:bg-boxdark"
                            key="submit"
                            type="primary"
                            htmlType="submit"
                            onClick={() => form.submit()}
                        >
                            {t('submit_for_approval')}
                        </Button></>}
                >

                    <div className='my-5 w-full bg-[#1F677D] h-20 items-center justify-center'>
                        <h1 className='text-white text-center font-bold text-2xl'>Total SMS Blance</h1>
                        <h1 className='text-white text-center italic text-4xl'> {activeBalance}</h1>
                    </div>
                    <Form onFinish={submitData} name="form_item_path" layout="vertical" form={form}>
                        <div className='row'>

                            <Form.Item label={t('content_title')} name="title" rules={[
                                {
                                    required: true,
                                    message: `${t('content_required_title')}`,
                                }]}>
                                <Input className='p-2' />
                            </Form.Item>
                            <div className='m-0 p-0'>{t('content_body')} {` # ${characterCount} ${t('number_of_sms')}`}</div>
                            <Form.Item name="body" rules={[
                                {
                                    required: true,
                                    message: `${t('content_required_body')}`,
                                }]}>
                                <TextArea className='p-2' onChange={handleBodyChange} />

                            </Form.Item>


                        </div>

                        <div className='h-200 w-full overflow-auto '>
                            <div className='flex '>
                                <div className='flex-grow'>
                                    <Search
                                        placeholder={t('filter_using_names_phonenumber')}
                                        onSearch={onSearch} onChange={(e) => setQuery(e.target.value)}
                                        className='bg-white dark:bg-boxdark' />

                                </div>
                            </div>
                            <CustomTable
                                rowSelection={rowSelection}
                                column={columns}
                                data={memberData}
                                handleChange={null}
                                pagination={false}
                            />
                        </div>
                    </Form>
                </CustomModal>
            </div>
        </>
    );
};

export default AddContent;
