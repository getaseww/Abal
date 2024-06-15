export type PaymentType = {
    id?: number,
    amount: number,
    trx_ref: string,
    status: string,
    subscription_id: number,
    member_id: number,
    user_id: string,

    createdAt: Date,
    updatedAt?: Date
}