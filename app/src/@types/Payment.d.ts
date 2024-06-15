import { UserType } from "./User"

export type PaymentType = {
    id?: number,
    amount: number,
    trx_ref: string,
    status: string,
    date: Date,
    subscription_id: number,
    member_id: number,
    user_id: string,
    payer: UserType,
    createdAt: Date,
    updatedAt?: Date
}