"use client"

import { IGuest } from "@/app/types"
import { BASE_API_URL } from "@/global"
import { getCookie } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { toast} from "react-toastify"
import axios from "axios"
import { FaPlus } from "react-icons/fa";
import { ButtonPrimary, ButtonSuccess, ButtonDanger } from "@/components/buttonComponent"
import { InputGroupComponent } from "@/components/inputComponent"
import Modal from "@/components/modal"
import { IoMdClose } from "react-icons/io";

const AddGuest = () => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [guest, setGuest] = useState<IGuest>({
        id: 0,
        full_name: ``,
        email: ``,
        password: ``,
        phone: ``,
        address: ``,
        createdAt: ``,
        updatedAt: ``
    })
    const router = useRouter()
    const TOKEN = getCookie("token") || ""
    const formRef = useRef<HTMLFormElement>(null)

    const openModal = () => {
        setGuest({
            id: 0,
            full_name: ``,
            email: ``,
            password: ``,
            phone: ``,
            address: ``,
            createdAt: ``,
            updatedAt: ``
        })
        setIsShow(true)
        if(formRef.current) formRef.current.reset()
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/authGuest/register`
            const {full_name, email, password, phone, address} = guest
            const payload = new FormData()
            payload.append("full_name", full_name || "")
            payload.append("email", email || "")
            payload.append("password", password || "")
            payload.append("phone", phone || "")
            payload.append("address", address || "")
            const { data } = await axios.post(url, payload, {
                headers: { "Content-Type": "application/json" }
            })
            if (data?.status) {
                setIsShow(false)
                toast(data?.message, { hideProgressBar: true, containerId: `toastMenu`, type: `success`, autoClose: 2000})
                setTimeout(() => router.refresh(), 1000)
            }else{
                toast(data?.message, { hideProgressBar: true, containerId: `toastMenu`, type: `warning`, autoClose: 2000})
            }
        } catch (error) {
            console.log(error);
            toast(`Something Wrong`, { hideProgressBar: true, containerId: `toastMenu`, type: `error`,autoClose: 2000})
        }
    }

    return(
        <div>
            <ButtonSuccess type="button" onClick={() => openModal()}>
                <div className="flex items-center gap-2">
                    <FaPlus />
                    Add Menu
                </div>
            </ButtonSuccess>
            <Modal isShow={isShow} onClose={state => setIsShow(state)}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
                        <div className="w-full flex items-center">
                            <div className="flex flex-col">
                                <strong className="font-bold text-2xl">Create New Guest</strong>
                                <small className="text-slate-400 text-sm">Only admin can create guest</small>
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
                        <InputGroupComponent id={`full_name`} type="text" value={guest.full_name} onChange={val => setGuest({...guest, full_name: val})} required={true} label="Name"/>
                        <InputGroupComponent id={`email`} type="text" value={guest.email} onChange={val => setGuest({...guest, email: val})} required={true} label="Email"/>
                        <InputGroupComponent id={`password`} type="password" value={guest.password} onChange={val => setGuest({...guest, password: val})} required={true} label="Password"/>
                        <InputGroupComponent id={`phone`} type="text" value={guest.phone} onChange={val => setGuest({...guest, phone: val})} required={true} label="Phone"/>
                        <InputGroupComponent id={`address`} type="text" value={guest.address} onChange={val => setGuest({...guest, address: val})} required={true} label="Address"/>
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

export default AddGuest