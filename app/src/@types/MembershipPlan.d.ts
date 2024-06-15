export type MembershipPlanType = {
    id?: number,
    name: string;
    price: number;
    duration: number;
    max_member?: number;
    access_level: number;
    description: string;
    user_id: number;
    image?: string

    createdAt:Date,
    updatedAt?:Date
}