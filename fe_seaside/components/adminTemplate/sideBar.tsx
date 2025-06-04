"use client"

import { ReactNode, useState, useEffect } from "react"
import Image from "next/image"
import MenuItem from "./menuItem"
import { useRouter } from "next/navigation"
import { BASE_API_URL } from "@/global"
import { IUser } from "@/app/types"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { FaUser } from "react-icons/fa"
import Logo_SeaSide from "../../public/images/Logo_SeaSide.png"
import {  getCookie, removeCookie } from "@/lib/client-cookies";
import { get } from "@/lib/api-bridge"
import { jwtDecode } from "jwt-decode"
// Import logo dan profile

type MenuType = {
    id: string,
    icon: ReactNode,
    path: string,
    label: string
}

type ManagerProp = {
    children: ReactNode,
    id: string,
    title: string,
    menuList: MenuType[]
}

const Sidebar = ({children, id, title, menuList}: ManagerProp) => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const[isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [user, setUser] = useState<IUser | null>(null)
    const router = useRouter()

    useEffect(() => {
    const decodeToken = () => {
        const TOKEN = getCookie("token");
        if (!TOKEN) return;

        try {
            const decoded: IUser = jwtDecode(TOKEN); // pastikan struktur IUser sesuai dengan payload JWT
            console.log("Decoded token payload:", decoded);
            setUser(decoded);
        } catch (error) {
            console.error("Failed to decode token:", error);
        }
    };
    decodeToken();
}, []);

    const handleLogout = () => {
        removeCookie("token");
        removeCookie("id")
        removeCookie("name")
        removeCookie("email")
        removeCookie("role")
        router.replace(`/user/login`)
    }
    const toggleDropdown = () => {
        setIsDropdownOpen (!isDropdownOpen);
    }
    return(
        <div className="w-full min-h-dvh bg-slate-50">
            {/* Header */}
            <header className="flex justify-between items-center p-4 mb-0 bg-cyan-500 shadow-md">
                <div className="flex gap-2">
                    <button onClick={() => setIsShow(true)}>
                        <GiHamburgerMenu  className="text-white hover: cursor-pointer"/>
                    </button>
                    <h1 className="font-bold text-xl text-white">
                        {title}
                    </h1>
                </div>

                <div className="relative">
                    <button onClick={toggleDropdown} className="flex gap-1 items-center space-x-2 text-white hover:cursor-pointer">
                        <FaUser />
                        <span className="font-bold">{user?.name}</span>
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 top-full">
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer">Profile</a>
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer">Settings</a>
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer" onClick={handleLogout}>Log Out</a>
                        </div>
                    )}
                </div>
            </header>
            {/* end header */}
            {/* content section */}
            <div className="p-4">
                {children}
            </div>
            {/* end content */}
            {/* sidebar section */}
            <div className={`flex flex-col w-2/3 md:w-1/2 lg:w-1/4 h-full fixed top-0 right-full transition-transform z-50 bg-white border-r border-cyan-500 ${isShow ? `translate-x-full` : ``}`}>
                {/* close button */}
                <div className="ml-auto p-2">
                    <button onClick={() => setIsShow(false)} className="hover: cursor-pointer">
                        <IoMdClose className="text-black text-xl"/>
                    </button>
                </div>
                {/* end close button */}

                {/* logo section */}
                <div className="mb-3 w-full flex justify-center">
                    <div className="flex items-center space-x-2">
                        <Image src={Logo_SeaSide} alt="Logo" width={40} height={40}/>
                        <h1 className="text-2xl font-bold text-cyan-500">Sea Side</h1>
                    </div>
                </div>
                {/* end logo section */}

                {/* user section */}
                <div className="w-full mt-10 mb-6 bg-cyan-500 text-white p-6 py-4 flex gap-2 items-center">
                    <div className="text-md font-semibold">
                        {user?.name || "Admin"}
                    </div>
                </div>
                {/* end user section */}

                {/* menu section */}
                <div className="w-full py-2 overflow-y">
                    <div className="flex flex-col gap-2">
                        {
                            menuList.map((menu, index) => (
                                <MenuItem icon={menu.icon} label={menu.label} path={menu.path} active={menu.id === id} key={`keyMenu${index}`}/>
                            ))
                        }
                    </div>
                </div>
                {/* end menu section */}
            </div>
            {/* end sidebar section */}
        </div>
    )
}

export default Sidebar