// import { FaBars, FaIcons } from "react-icons/fa6";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'; // Importing icons from react-icons
import { routes } from "../../constants/constants";

export default function Sidebar({ isOpen, toggleSidebar }: { isOpen: boolean, toggleSidebar: any }) {
    const [expandedMenus, setExpandedMenus] = useState<any>({});

    const toggleMenu = (index: number) => {
        setExpandedMenus((prev: any) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const menus = [
        { title: 'Look Up', items: [{ name: 'Role', link: routes.ROLE }] },
    ];

    return (
        <div className={`h-screen-minus-20 fixed inset-y-0 left-0 w-50 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 lg:static lg:inset-auto lg:translate-x-0`}>
            <div className="p-6 flex items-center justify-between lg:hidden">
                {/* <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1> */}
                <button onClick={toggleSidebar} className="p-2 text-gray-500 rounded-lg hover:bg-gray-200">
                    <IoMdClose className="text-black" />
                    {/* <i className="fas fa-times"></i> */}
                </button>
            </div>

            <nav className="mt-6">
                <SidebarItem text="Dashboard" link={routes.DASHBOARD} />
                <SidebarItem text="Memebers" link={routes.MEMBER} />

                {menus.map((menu, index) => (
                    <Menu
                        key={index}
                        title={menu.title}
                        items={menu.items}
                        isExpanded={!!expandedMenus[index]}
                        toggleMenu={() => toggleMenu(index)}
                    />
                ))}
            </nav>

        </div>
    );
};

const Menu = ({ title, items, isExpanded, toggleMenu }: { title: string, items: any, isExpanded: boolean, toggleMenu: any }) => {
    return (
        <div className="bg-white   overflow-hidden mb-4">
            <div
                onClick={toggleMenu}
                className="w-full px-4 py-2 text-left flex items-center justify-between bg-blue-500 text-black focus:outline-none"
            >
                <p> {title}</p>
                <span>
                    {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                </span>
            </div>
            {isExpanded && (
                <div className="px-4 py-1 bg-gray-100">
                    <ul>
                        {items.map((item: any, index: number) => (
                            <a href={item.link}>
                                <li key={index} className="py-2">
                                    {item.name}
                                </li>
                            </a>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};



const SidebarItem = ({ text, link }: { text: string, link: string }) => {
    return (
        <a
            href={link}
            className="text-black block py-1.5 px-4 rounded transition duration-200 hover:bg-gray-200"
        >
            {text}
        </a>
    );
};