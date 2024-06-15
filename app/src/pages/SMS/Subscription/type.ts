import { PackageType } from "../Package/type";

export type SubscriptionType = {
    id: number;
    package_id:number;
    quantity: number;
    amount:number;
    used: number;
    remaining: number;
    package?:PackageType;
    user_id: number;
    is_active: number;
    modified_by?: number;
    is_approved: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type AddSubscriptionPropType = {
    refetch: Function
}
export type EditSubscriptionPropType = {
    data: SubscriptionType,
    refetch: Function
}