'use client'

import { ReactNode, useState } from "react";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div >
            <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex">
                <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <>
                    <Outlet />
                </>
            </div>
        </div>
    )
}
