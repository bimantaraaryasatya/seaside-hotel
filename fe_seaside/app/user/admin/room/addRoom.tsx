"use client"

import { IRoom } from "@/app/types"
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
import FileInput from "@/components/fileInput"

const AddRoom = () => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [room, setRoom] = useState<IRoom>({
        id: 0,
        room_number: ``,
        type: ``,
        price: 0,
        status: ``,
        room_image: ``,
        createdAt: ``,
        updatedAt: ``
    })
    const router = useRouter()
    const TOKEN = getCookie("token") || ""
    const [file, setFile] = useState<File | null>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const openModal = () => {
        setRoom({
            id: 0,
            room_number: ``,
            type: ``,
            price: 0,
            status: ``,
            room_image: ``,
            createdAt: ``,
            updatedAt: ``
        })
        setIsShow(true)
        if(formRef.current) formRef.current.reset()
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/room`
            const {room_number, type, price, status} = room
            const payload = new FormData()
            payload.append("room_number", room_number || "")
            payload.append("type", type || "")
            payload.append("price", price !== undefined ? price.toString() : "0")
            payload.append("status", status || "")
            if (file !== null) {
                payload.append("room_image", file || "")
            }
            const { data } = await post(url, payload, TOKEN)
            if (data?.status) {
                setIsShow(false)
                toast(data?.message, { hideProgressBar: true, containerId: `toastMenu`, type: `success`, autoClose: 2000})
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(data?.message || "Something went wrong or Room number already exists", {
                hideProgressBar: true,
                containerId: `toastMenu`,
                type: `warning`,
                autoClose: 2000
                })
            }
        } catch (error: any) {
            const errMessage = error?.response?.data?.message || "Something went wrong"
            toast(errMessage, {
                hideProgressBar: true,
                containerId: `toastMenu`,
                type: `error`,
                autoClose: 2000
            })
            console.error("Error saat post room:", error)
        }
    }

    return(
        <div>
            <ButtonSuccess type="button" onClick={() => openModal()}>
                <div className="flex items-center gap-2">
                    <FaPlus />
                    Add Room
                </div>
            </ButtonSuccess>
            <Modal isShow={isShow} onClose={state => setIsShow(state)}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
                        <div className="w-full flex items-center">
                            <div className="flex flex-col">
                                <strong className="font-bold text-2xl">Create New Room</strong>
                                <small className="text-slate-400 text-sm">Only admin can create room</small>
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
                        <InputGroupComponent id={`room_number`} type="text" value={room.room_number} onChange={val => setRoom({...room, room_number: val})} required={true} label="Room Number"/>
                        <InputGroupComponent id={`price`} type="number" value={room.price.toString()} onChange={val => setRoom({...room, price: Number(val)})} required={true} label="Price"/>
                        <Select id={`type`} value={room.type} className="text-black" label="Type" required={true} onChange={val => setRoom({...room, type: val})}>
                            <option value="">--- Select Type ---</option>
                            <option value="standard">Standard</option>
                            <option value="deluxe">Deluxe</option>
                            <option value="suite">Suite</option>
                            <option value="family">Family</option>
                        </Select>
                        <Select id={`status`} value={room.status} className="text-black" label="Status" required={true} onChange={val => setRoom({...room, status: val})}>
                            <option value="">--- Select Status ---</option>
                            <option value="available">Available</option>
                            <option value="occupied">Occupied</option>
                            <option value="maintenance">Maintenance</option>
                        </Select>
                        <FileInput acceptTypes={["application/pdf", "image/png", "image/jpeg", "image/jpg"]} id="room_image" label="Upload Image (Max 2MB, PDF/JPG/JPEG,PNG)" onChange={f => setFile(f)} required={false}/>
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

export default AddRoom