export type User = {
    id?: string,
    firstName: string,
    lastName: string,
    businessName: string,
    email: string,
    password: string,
    createdAt?: Date,
    updatedAt: Date,
    // role?: Role,
    // class?:Class,
    // instructor?:User,
    // payment?:Payment,
}

export type Member={
    userId:number,
    firstName:string,
    lastName:string,
    email:string,
    phoneNumber:string,
    password:string,
    sex:string,
}

export type Subscription={
    userId:number,
    memberId:number,
    membershipPlanId:number,
    startDate:Date,
    endDate:Date,
    status:string,
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
    subscriptionId: number,
    memberId: number,
    createdAt?: Date,
    updatedAt: Date,

    // user?: User
}

export type MembershipPlan = {
    id?: string,
    name: string,
    description:string,
    duration:string,
    maxMembers:number,
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