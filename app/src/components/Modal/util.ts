import { ReactNode } from "react"

export type CustomModalPropType={
    title:string,
    open:boolean,
    handleOk:any,
    handleCancel:any,
    children:ReactNode,
    footer?:ReactNode,
    width?:number
}


