export type PackageType = {
    id: number;
    name: string;
    description?: string;
    quantity:number;
    price:number;
    user_id: number;
    modified_by?: number;
    createdAt: Date;
    updatedAt: Date;
}

export type AddPackagePopType={
    refetch:Function
}
export type EditPackagePopType={
    data:PackageType,
    refetch:Function
}