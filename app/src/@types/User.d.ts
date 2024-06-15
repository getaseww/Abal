import { ProfileType } from "./Profile"
import { RoleType } from "./Role"
import { SubscriptionType } from "./Subscription"

export type UserType = {
    id?: number,
    first_name: string,
    last_name: string,
    phone_number: string,
    password?: string,
    role_id: number,
    user_id: number,
    role?: RoleType,
    user?: any,
    createdAt: Date,
    updatedAt?: Date,
    subscriptions: SubscriptionType[],
    profile?: ProfileType
}