import { Avatar, Button, Popover } from "antd";
import { FaBars } from "react-icons/fa6";
import { UserOutlined } from '@ant-design/icons';
import { userStore } from "../../store/userStore";

export default function Header({ toggleSidebar }: { toggleSidebar: any }) {
    
    const { logout } = userStore((state: any) => state)

    return (
        <header className="h-15 flex items-center justify-between px-6 bg-white shadow md:flex-wrap">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="p-2 text-gray-500 rounded-lg hover:bg-gray-200 lg:hidden">
                    <FaBars className="text-black" />
                </button>
                <h1 className="ml-4 text-2xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center">
                <Popover placement="rightBottom"
                    // title={"text"}
                    content={
                        (
                            <div className="flex flex-col">
                                <Button 
                                className="text" 
                                type="link"
                                onClick={()=>logout()}
                                >Logout</Button>
                                <Button type="link">Setting</Button>

                            </div>
                        )
                    }
                >
                    <Avatar size={40} icon={<UserOutlined />} />
                </Popover>

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