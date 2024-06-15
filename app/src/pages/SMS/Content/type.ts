export type ContentType = {
    id: number;
    title: string;
    body: string;
    phone_numbers:string;
    reference_txt:string;
    message_status?:string;
    status: string;
    sent_date:string;
    user_id: number;
    modified_by?: number;
    createdAt: Date;
    updatedAt: Date;
}

export type AddContentPopType={
    refetch:Function,
}
export type EditContentPopType={
    data:ContentType,
    refetch:Function
}