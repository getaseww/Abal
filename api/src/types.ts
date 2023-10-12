export type User = {
    id?: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    sex: string,
    email?: string,
    password: string,
    roleId: string,
    createdAt?: Date,
    updatedAt: Date,
    // role?: Role,
    // class?:Class,
    // instructor?:User,
    // payment?:Payment,
}

export type Role = {
    id?: string,
    name: string,
    createdAt?: Date,
    updatedAt?: Date,
    // user?: User
}

export type Membership = {
    id?:string,
    startDate:Date,
    endDate:Date,
    status:string,

    createdAt?: Date,
    updatedAt?: Date,
}




export type Payment = {
    id?: string,
    amount: number,
    trx_ref: string,
    status: string,
    membershipPlanId: string,
    userId: string,

    createdAt?: Date,
    updatedAt: Date,

    // user?: User
}

export type MembershipPlan = {
    id?: string,
    planName: string,
    description:string,
    price:number,
    createdAt?: Date,
    updatedAt?: Date,
    // user: User,
    // payment:Payment[],
}


export type Error={
    message?:string,
    errorCode?:string,
    statusCode?:number,
}