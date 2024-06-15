'use client'

import { useState } from "react";
import Header from "../components/dashboard/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";

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
