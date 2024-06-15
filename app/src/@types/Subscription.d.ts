import { MembershipPlanType } from "./MembershipPlan";
import { UserType } from "./User";

export type SubscriptionType = {
    id?: number,
    start_date: Date;
    end_date: Date;
    membership_plan_id: number;
    member_id: number;
    user_id: number;
    createdAt: Date,
    status: string,
    updatedAt?: Date,
    subscriber: UserType
    membership_plan: MembershipPlanType
}