import React, { ReactNode, useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import type { DrawerProps, RadioChangeEvent } from 'antd';

interface SidePanelPropTypes {
    is_title_row?: boolean,
    button_title: any,
    title: string,
    open: boolean,
    setOpen: Function,
    children: ReactNode,
    width?: number,
    isText: boolean

}

const SidePanel: React.FC<SidePanelPropTypes> = ({ is_title_row, button_title, isText, width, title, open, setOpen, children }) => {

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Space>
                {is_title_row ?
                    <div onClick={showDrawer}
                    >
                        {button_title
                        }
                    </div>
                    : <Button type={isText ? "text" : "primary"}
                        className={`${!isText ? 'bg-[#1F677D] dark:bg-boxdark text-white' : ''}`}
                        onClick={showDrawer}
                    >
                        {button_title}
                    </Button>
                }
            </Space>
            <Drawer
                title={title}
                placement="right"
                width={width ? width : 500}
                onClose={onClose}
                open={open}
            >
                {children}
            </Drawer>
        </>
    );
};

export default SidePanel;