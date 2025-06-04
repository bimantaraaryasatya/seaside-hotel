import { ReactNode } from "react";
import { FaHome } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { MdBedroomParent } from "react-icons/md";

interface IPropMenu {
   id: string,
   path: string,
   label: string,
   icon: ReactNode
}

let MenuList: IPropMenu[] = [
    {
        id: `dashboard`,
        path: `/user/admin/dashboard`,
        label: `Dashboard`,
        icon: <FaHome />
    },
    {
        id: `user`,
        path: `/user/admin/user`,
        label: `User`,
        icon: <FaRegUser/>
    },
    {
        id: `guest`,
        path: `/user/admin/guest`,
        label: `Guest`,
        icon: <FaUserCheck/>
    },
    {
        id: `room`,
        path: `/user/admin/room`,
        label: `Room`,
        icon: <MdBedroomParent/>
    }
]

export default MenuList