import { FaAnchor, FaDollarSign, FaGear, FaMessage, FaUser } from "react-icons/fa6";
import Card from "../components/dashboard/Card";
import DefaultLayout from "../layouts/DefaultLayout";
import { userStore } from "../store/userStore";
import { languageStore } from "../store/languageStore";
import { useQuery } from "@tanstack/react-query";
import { retrieveData } from "../utils/utils";
import { Role } from "../enums/enums";
import ChartTwo from "../components/Chart/ChartTwo";
import ChartThree from "../components/Chart/ChartThree";


export default function page() {

    const token = userStore((state: any) => state.token)
    const lang: string = languageStore((state: any) => state.lang)
    const user: any = JSON.parse(userStore((state: any) => state.user))


    const header = {
        Authorization: `Bearer ${token}`,
    }

    const { data: memberData } = useQuery({
        queryKey: ['dashboard_members'],
        queryFn: () => retrieveData(`user`, header),
    })

    const { data: memberhsipPlanData } = useQuery({
        queryKey: ['dashboard_membership_plan'],
        queryFn: () => retrieveData(`membership-plan`, header),
    })

    const { data: paymentData } = useQuery({
        queryKey: ['dashboard_payment'],
        queryFn: () => retrieveData(`payment`, header),
    })

    const { data: balanceDatas } = useQuery({
        queryKey: ['sms_balance'],
        queryFn: () => retrieveData("sms/balance", header),
    })
    const { data: equipmentData } = useQuery({
        queryKey: ['dashboard_equipment'],
        queryFn: () => retrieveData(`inventory/equipment`, header),
    })





    const cardData: any = [
        { title: 'Members', value: 1000, icon: < FaUser /> },
        { title: 'Membership Plan', value: 3, icon: < FaUser /> },
        { title: 'Income', value: 67770, icon: < FaDollarSign /> },
        { title: 'SMS Balance', value: 67770, icon: < FaMessage /> },

    ];

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:m-4 md:m-8">
                <Card
                    key={1}
                    title={user?.role == Role.ADMIN ? "Users" : "Members"}
                    value={memberData?.length}
                    icon={< FaUser />}
                />
                <Card
                    key={2}
                    title="Membership Plan"
                    value={memberhsipPlanData?.length}
                    icon={< FaUser />}
                />
                <Card
                    key={3}
                    title="Income"
                    value={1000}
                    icon={< FaDollarSign />}
                />

                <Card
                    key={4}
                    title="SMS Balance"
                    value={balanceDatas?.length > 0 ? Number(balanceDatas[0].balance) - Number(balanceDatas[0].used) : 0}
                    icon={< FaMessage />}
                />
                <Card
                    key={5}
                    title="Equipment"
                    value={equipmentData?.length}
                    icon={< FaAnchor />}
                />
            </div>
            <div className="sm:m-4 md:m-8 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <ChartTwo />
                <ChartThree />
            </div>
        </div>
    )
}
