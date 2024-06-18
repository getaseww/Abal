export type MenuType = {
    title: string,
    items: MenuItemType[],
    access: string[],
}

export type MenuItemType = {
    name: string,
    link: string,
    access: string[]
}



export type EquipmentCategoryType = {
    id?: number;
    name: string;
    user_id: number;
    modified_by?: number;
    readonly createdAt: Date;
    readonly updatedAt?: Date;
}

export type EquipmentType = {
    id?: number;
    equipment_category_id: number;
    name: string;
    brand?: string;
    model?: string;
    serial_number?: string;
    purchase_date?: Date;
    price: number;
    location?: string;
    status?: string;
    condition?: string;

    user_id: number;
    modified_by?: number;
    equipment_category: EquipmentCategoryType,
    readonly createdAt: Date;
    readonly updatedAt?: Date;
}