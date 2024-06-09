import { FaBars } from "react-icons/fa6";

export default function Header({ toggleSidebar }: { toggleSidebar: any }) {
    return (
        <header className="h-20 flex items-center justify-between p-6 bg-white shadow md:flex-wrap">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="p-2 text-gray-500 rounded-lg hover:bg-gray-200 lg:hidden">
                    <FaBars className="text-black" />
                </button>
                <h1 className="ml-4 text-2xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center">
                {/* <button className="p-2 text-gray-500 rounded-lg hover:bg-gray-200">
                    <i className="fas fa-bell"></i>
                </button> */}
                {/* <img
                    src="/images/"
                    alt="User Avatar"
                    className="w-10 h-10 ml-4 rounded-full"
                />
                <span className="ml-2 text-gray-600"></span> */}
            </div>
        </header>
    );
};