"use client"

import { IUser } from "@/app/types"
import { BASE_API_URL } from "@/global"
import { post } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { toast } from "react-toastify"
import { FaPlus } from "react-icons/fa";
import { ButtonPrimary, ButtonSuccess, ButtonDanger } from "@/components/buttonComponent"
import { InputGroupComponent } from "@/components/inputComponent"
import Modal from "@/components/modal"
import { IoMdClose } from "react-icons/io";
import Select from "@/components/select"

const AddUser = () => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [user, setUser] = useState<IUser>({
        id: 0,
        name: ``,
        email: ``,
        password: ``,
        role: ``,
        createdAt: ``,
        updatedAt: ``
    })
    const router = useRouter()
    const TOKEN = getCookie("token") || ""
    const formRef = useRef<HTMLFormElement>(null)

    const openModal = () => {
        setUser({
            id: 0,
            name: ``,
            email: ``,
            password: ``,
            role: ``,
            createdAt: ``,
            updatedAt: ``
        })
        setIsShow(true)
        if(formRef.current) formRef.current.reset()
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/authUser/register`
            const {name, email, password, role} = user
            const payload = new FormData()
            payload.append("name", name || "")
            payload.append("email", email || "")
            payload.append("password", password || "")
            payload.append("role", role || "")
            const { data } = await post(url, payload, TOKEN)
            if (data?.status) {
                setIsShow(false)
                toast(data?.message, { hideProgressBar: true, containerId: `toastMenu`, type: `success`, autoClose: 2000})
                setTimeout(() => router.refresh(), 1000)
            }else{
                toast(data?.message, { hideProgressBar: true, containerId: `toastMenu`, type: `warning`, autoClose: 2000})
            }
        } catch (error) {
            console.log(error);
            toast(`Something Wrong`, { hideProgressBar: true, containerId: `toastMenu`, type: `error`, autoClose: 2000})
        }
    }

    return(
        <div>
            <ButtonSuccess type="button" onClick={() => openModal()}>
                <div className="flex items-center gap-2">
                    <FaPlus />
                    Add User
                </div>
            </ButtonSuccess>
            <Modal isShow={isShow} onClose={state => setIsShow(state)}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
                        <div className="w-full flex items-center">
                            <div className="flex flex-col">
                                <strong className="font-bold text-2xl">Create New User</strong>
                                <small className="text-slate-400 text-sm">Only admin can create user</small>
                            </div>
                            <div className="ml-auto">
                                <button type="button" className="text-slate-400" onClick={() => setIsShow(false)}>
                                    <IoMdClose />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* end modal header */}

                    {/* modal body */}
                    <div className="p-5">
                        <InputGroupComponent id={`name`} type="text" value={user.name} onChange={val => setUser({...user, name: val})} required={true} label="Name"/>
                        <InputGroupComponent id={`email`} type="text" value={user.email} onChange={val => setUser({...user, email: val})} required={true} label="Email"/>
                        <InputGroupComponent id={`password`} type="password" value={user.password} onChange={val => setUser({...user, password: val})} required={true} label="Password"/>
                        <Select id={`role`} value={user.role} className="text-black " label="Category" required={true} onChange={val => setUser({...user, role:val})}>
                            <option value="">--- Select Role ---</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                            <option value="receptionist">Receptionist</option>
                        </Select>
                    </div>
                    {/* end modal body */}

                    {/* modal footer */}
                    <div className="w-full p-5 flex rounded-b-2xl shadow">
                        <div className="flex ml-auto gap-2">
                            <ButtonDanger type="button" onClick={() => setIsShow(false)} className="hover: cursor-pointer">
                                Cancel
                            </ButtonDanger>
                            <ButtonPrimary type="submit" className="hover: cursor-pointer">
                                Save
                            </ButtonPrimary>
                        </div>
                    </div>
                    {/* end modal footer */}
                </form>
            </Modal>
        </div>
    )
}

export default AddUser