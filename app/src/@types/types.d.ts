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