'use client'

import { ReactNode, useState } from "react";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/Sidebar";

export default function SidebarLayout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div >
            <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex">
                <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                {children}
            </div>
        </div>
    )
}
