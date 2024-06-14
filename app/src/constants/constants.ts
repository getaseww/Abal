export const MAIN_API_URL = import.meta.env.PROD ? "https://newcom.efoyplus.com/api/" : "http://localhost:8000/api/";


export const routes = {
    HOME: "/",
    LOGIN: "/login",
    DASHBOARD: "/dashboard",
    MEMBER: "/dashboard/member",
    MEMEBERSHIP_PLAN: "/dashboard/membership-plan",
    SUBSCRIPTION: "/dashboard/subscription",
    ROLE: "/dashboard/role",
}

export const BUTTON_BACKGROUND = "bg-[#1F677D]";
