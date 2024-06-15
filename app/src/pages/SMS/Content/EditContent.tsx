import { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { SearchProps } from 'antd/es/input/Search';
import CustomModal from '../../../components/Modal/index.tsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import TextArea from 'antd/es/input/TextArea';
import { t } from 'i18next';
import { EditContentPopType } from './type.ts';
import { userStore } from '../../../store/userStore.ts';
import CustomTable from '../../../components/Table/CustomTable.tsx';
import { ColumnsType } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { checkUnicode, putData, retrieveData } from '../../../utils/utils.ts';
import { Role, SMSSTATUS } from '../../../enums/generalEnums.ts';
import { UserType } from '../../../@types/User';



const EditContent: React.FC<EditContentPopType> = ({ data, refetch }) => {

    const [form] = Form.useForm();
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const token = userStore((state: any) => state.token)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [action, setAction] = useState<'approve' | 'reject' | null>(null);
    const user: any = JSON.parse(userStore((state: any) => state.user))
    const [query, setQuery] = useState<string | null>();
    const [userType, setUserType] = useState<string | null>()

    const header = {
        Authorization: `Bearer ${token}`,
    }

    const { data: leaseData, refetch: refetchUserData } = useQuery({
        queryKey: ['lease-data-sms', 'sms'],
        queryFn: () => retrieveData(`lease?name=${query}`, header),
    })

    const { data: shareholderData, refetch: refetchShareholdersData } = useQuery({
        queryKey: ['shareholders-data-sms', 'sms'],
        queryFn: () => retrieveData(`share-holder?name=${query}`, header),
    })
    const leaseExtracted = leaseData && leaseData.map((tenantItem: any) => {
        const id = tenantItem.tenant.id;
        const full_name = tenantItem.tenant.full_name;
        const phone_number = tenantItem.tenant.phone_number;

        // Return an object with the required fields
        return { id, full_name, phone_number };
    });

    const shareExtracted = shareholderData && shareholderData.map((shItem: any) => {
        const id = shItem.holder.id;
        const full_name = shItem.holder.full_name;
        const phone_number = shItem.holder.phone_number;

        // Return an object with the required fields
        return { id, full_name, phone_number };
    });
    const { data: balanceDatas } = useQuery({
        queryKey: ['sms_balance'],
        queryFn: () => retrieveData("sms/balance?user_id=" + data.user_id, header),
    })

    const [filteredData, setFilteredData] = useState<any>();
    console.log("user data " + JSON.stringify(shareExtracted))
    useEffect(() => {
        if (leaseExtracted && shareExtracted) {
            if (userType === Role.MEMBER)
                setFilteredData(leaseExtracted);
            else if (userType === Role.MEMBER)
                setFilteredData(shareExtracted);
            else {
                const dataMerged = (leaseExtracted || []).concat(shareExtracted || []);

                const uniqueData = new Set<string>();

                dataMerged.forEach((item: any) => {
                    uniqueData.add(JSON.stringify(item));
                });

                const uniqueExtractedData = Array.from(uniqueData).map(item => JSON.parse(item));

                setFilteredData(uniqueExtractedData);
            }
        }
    }, [userType]);

    var activeBalance: number = 0;
    if (balanceDatas != null && balanceDatas != undefined && balanceDatas.length > 0)
        activeBalance = Number(balanceDatas[0].balance) - Number(balanceDatas[0].used);


    const approveMutation = useMutation(
        {
            mutationFn: (contentdata: any) => putData(`sms/content/send-bulk-sms/${data.id}`, contentdata, header),
            onSuccess: () => {
                toast.success(`${t('content_successful_update')}`)
                setOpenEdit(false);
                refetch()
            },
            onError: () => {
                toast.error(`${t('content_failed_update')}`)
            }
        }
    );
    const rejectMutation = useMutation(
        {
            mutationFn: (contentdata: any) => putData(`content/${data.id}`, contentdata, header),
            onSuccess: () => {
                toast.success(`${t('content_successful_update')}`)
                setOpenEdit(false);
                refetch()
            },
            onError: () => {
                toast.error(`${t('content_failed_update')}`)
            }
        }
    );

    console.log("lease data " + JSON.stringify(leaseExtracted))
    const approveData = (value: any) => {
        let count_sms;
        if (checkUnicode(value.body)) {
            count_sms = Math.ceil(value.body.length / 70);
        } else {
            count_sms = Math.ceil(value.body.length / 160)
        }
        const numberOfResidents = value.phone_numbers.length;

        // Check if the active balance is sufficient
        if ((numberOfResidents * count_sms) > activeBalance) {
            // Display an error message if the active balance is insufficient
            toast.error(`${t('insufficient_balance')}`);
            return;
        }
        const valueData = {
            user_id: data.user_id,
            phone_numbers: value.phone_numbers,
            body: value.body,
            title: value.title,
            status: value.status,
            resident_type: String(value.resident_type)
        }
        console.log(data.phone_numbers)
        approveMutation.mutate(valueData);
    };

    const rejectData = (value: any) => {
        const data = {
            phone_numbers: String(value.phone_numbers),
            body: value.body,
            title: value.title,
            status: SMSSTATUS.REJECTED,
            sent_date: new Date().toISOString(),
            resident_type: String(value.resident_type)
        }
        rejectMutation.mutate(data);
    };
    const handleButtonClick = (buttonType: 'approve' | 'reject') => {
        setAction(buttonType);
        form.submit();
    };
    const onFinish = (values: any) => {
        console.log(action + " hello")
        if (action === 'approve') {
            console.log(action + " TT")
            approveData(values);
        } else if (action === 'reject') {
            rejectData(values);
        }
    };





    const handleOk = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        // Note: No need for approveData and rejectData here; they are called in onFinish
        form.resetFields();
        setOpenEdit(false);
        setAction(null); // Reset the action after submission
    };
    const columns: ColumnsType<UserType> = [
        {
            title: `${t('full_name')}`,
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: `${t('phone_number')}`,
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
    ];
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        form.resetFields();
        setOpenEdit(false);
    };

    const [residentType, setResidentType] = useState<string | null>()
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    return (
        <>
            <div className='flex flex-col'>
                <Button type="text" onClick={() => setOpenEdit(true)}>{t('view_details')}</Button>
                <CustomModal open={openEdit} title={t('content_view_sms_details')} handleCancel={handleCancel} handleOk={handleOk}
                    footer={<>
                        {user.role == Role.ADMIN && <Button
                            className="bg-[#1F677D] dark:bg-boxdark"
                            key="approve"
                            type="primary"
                            htmlType="submit"
                            onClick={() => handleButtonClick('approve')}
                        >
                            {t('approve')}
                        </Button>}
                        {user.role == Role.ADMIN && <Button
                            className="bg-[#FF0000] dark:bg-boxdark"
                            key="reject"
                            type="primary"
                            htmlType="submit"
                            onClick={() => handleButtonClick('reject')}
                        >
                            {t('reject')}
                        </Button>}
                    </>}
                >
                    <Form
                        name="form_item_path"
                        layout="vertical"
                        form={form}
                        initialValues={{
                            ...data, sent_date: (data.sent_date != null && data.sent_date != "") ? dayjs(data.sent_date) : "", phone_numbers: data.phone_numbers.split(","),
                        }}
                        onFinish={onFinish} // Handle form submission in onFinish callback
                    >
                        <div className='row'>
                            <Form.Item label={t('content_title')} name="title" rules={[
                                {
                                    required: true,
                                    message: `${t('content_required_title')}`,
                                }]}>
                                <Input readOnly className='p-2' />
                            </Form.Item>
                            <Form.Item label={t('content_body')} name="body" rules={[
                                {
                                    required: true,
                                    message: `${t('content_required_body')}`,
                                }]}>
                                <TextArea readOnly className='p-2' />
                            </Form.Item>


                        </div>
                        <Row gutter={16}>
                            <Col xs={12} sm={12} md={8} lg={9}>
                                {(user.role == Role.MEMBER) && <Form.Item label={t('content_status')} name="status">
                                    <Input readOnly className='p-2' />
                                </Form.Item>}
                                <Form.Item
                                    name="type"
                                    className='flex-grow'
                                >
                                    <Select onChange={(e) => setUserType(e)}
                                        className='w-75'
                                    >
                                        <Select.Option
                                            key="All" value="All" >{t(`all`)}</Select.Option>
                                        <Select.Option
                                            key="share_holders" value={Role.MEMBER} >{t(`share_holder`)}</Select.Option>

                                    </Select>
                                </Form.Item>
                                <label className='p-4 mt-10 ml-auto' >{t('available_balance')} : {String(activeBalance)}</label>



                            </Col>
                            <Col xs={30} sm={30} md={14} lg={14}>
                                {(user.role == Role.MEMBER) && <Form.Item label={t('content_sent_date')} name="sent_date">
                                    <Input readOnly className='p-2' />
                                </Form.Item>}
                                <Form.Item hidden name="phone_numbers">
                                    <Input className='p-2' />
                                </Form.Item>


                                <CustomTable column={columns} data={(filteredData) && filteredData?.filter((i: any) => data.phone_numbers?.includes(i?.phone_number))} handleChange={null} pagination={false} />


                            </Col>
                        </Row>
                    </Form>
                </CustomModal>
            </div>
        </>
    );
};
export default EditContent;