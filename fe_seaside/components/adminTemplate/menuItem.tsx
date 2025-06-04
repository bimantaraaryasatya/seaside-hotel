import React from 'react'
import Link from 'next/link'

interface MenuItemProps{
    icon: React.ReactNode;
    label: string;
    path: string;
    active?: boolean;
}

const MenuItem = ({icon, label, path, active}: MenuItemProps) => {
    return(
        <Link href={path} className={`flex items-center px-6 py-6 hover:text-white hover:bg-cyan-500 transition duration-100 ease-in-out ${active ? 'text-cyan-500' : 'text-gray-700'}`}>
            <span className='mr-3'>{icon}</span>
            <span className='flex-1'>{label}</span>
        </Link>
    )
}

export default MenuItem;