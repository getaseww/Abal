export type CustomTablePropType = {
    column: any,
    data: any,
    handleChange: any,
    onError?: any
    pagination?: boolean,
    rowSelection?: any,
    rowKey?: string
}

export type RowSelectionTablePropType = {
    column: any,
    data: any,
    handleChange: any,
    onError?: any
    pagination?: boolean,
    rowSelection?: any,
    selectedRowKeys: any,
    setSelectedRowKeys: Function,
}