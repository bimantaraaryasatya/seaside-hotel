"use client"

import { IGuest } from "@/app/types"
import { BASE_API_URL } from "@/global"
import { put } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { toast } from "react-toastify"
import { ButtonPrimary, ButtonDanger } from "@/components/buttonComponent"
import { InputGroupComponent } from "@/components/inputComponent"
import Modal from "@/components/modal"

const UpdateGuest = ({ selectedGuest }: {selectedGuest: IGuest}) => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [guest, setGuest] = useState<IGuest>({...selectedGuest})
    const router = useRouter()
    const TOKEN = getCookie("token") || ""
    const formRef = useRef<HTMLFormElement>(null)

    const openModal = () => {
        console.log("Selected guest ID:", selectedGuest.id);
        setGuest({...selectedGuest, password: ""})
        setIsShow(true)
        if(formRef.current) formRef.current.reset()
    }

    const handleSubmit = async (e: FormEvent) => {
        try{
            e.preventDefault()
            const url = `${BASE_API_URL}/guest/${selectedGuest.id}`
            const {full_name, email, phone, address} = guest
            const payload = new FormData
            payload.append("full_name", full_name || "")
            payload.append("email", email || "")
            payload.append("phone", phone || "") 
            payload.append("address", address || "") 
            const { data } = await put (url, payload, TOKEN)
            if (data?.status) {
                setIsShow(false)
                toast(data?.message, {hideProgressBar: true, containerId: `toastMenu`, type: `success`, autoClose: 2000})
                setTimeout(() => router.refresh(), 1000)
            }else{
                toast(data?.message, {hideProgressBar: true, containerId: `toastMenu`, type: `warning`, autoClose: 2000})
            }
        } catch (error){
            console.log(error)
            toast(`Something Wrong`, { hideProgressBar: true, containerId: `toastMenu`, type: `error`, autoClose: 2000})
        }
    }

    return(
        <div>
            <ButtonPrimary type="button" onClick={() => openModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </ButtonPrimary>
            <Modal isShow={isShow} onClose={state => setIsShow(false)}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
                        <div className="w-full flex items-center">
                            <div className="flex flex-col">
                                <strong className="font-bold text-2xl">Update Guest</strong>
                                <small className="text-slate-400 text-sm">Update</small>
                            </div>
                            <div className="ml-auto">
                                <button type="button" className="text-slate-400" onClick={() => setIsShow(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* end modal header */}

                    {/* modal body */}
                    <div className="p-5">
                        <InputGroupComponent id={`full_name`} type="text" value={guest.full_name} className="text-black" onChange={val => setGuest({ ...guest, full_name:val})} required={true} label="Name"  />
                        <InputGroupComponent id={`email`} type="text" className="text-black" value={guest.email} onChange={val => setGuest({...guest, email:val})} required={true} label="Email"/>
                        <InputGroupComponent id={`phone`} type="text" className="text-black" value={guest.phone} onChange={val => setGuest({...guest, phone:val})} required={true} label="Phone"/>
                        <InputGroupComponent id={`address`} type="text" className="text-black" value={guest.address} onChange={val => setGuest({...guest, address:val})} required={true} label="Address"/>
                    </div>
                    {/* end modal body */}

                    {/* modal footer */}
                    <div className="w-full p-5 flex rounded-b-2xl shadow">
                        <div className="flex ml-auto gap-2">
                            <ButtonDanger type="button" onClick={() => setIsShow(false)}>
                                Cancel
                            </ButtonDanger>
                            <ButtonPrimary type="submit">
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

export default UpdateGuest;