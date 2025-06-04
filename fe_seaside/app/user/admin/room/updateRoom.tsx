"use client"

import { IRoom } from "@/app/types"
import { BASE_API_URL } from "@/global"
import { put } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { toast } from "react-toastify"
import { ButtonPrimary, ButtonDanger } from "@/components/buttonComponent"
import { InputGroupComponent } from "@/components/inputComponent"
import Modal from "@/components/modal"
import Select from "@/components/select"
import FileInput from "@/components/fileInput"

const UpdateRoom = ({ selectedRoom }: { selectedRoom: IRoom }) => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [room, setRoom] = useState<IRoom>({ ...selectedRoom })
    const [file, setFile] = useState<File | null>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter()
    const TOKEN = getCookie("token") || ""

    const openModal = () => {
        setRoom({ ...selectedRoom })
        setFile(null)
        setIsShow(true)
        if (formRef.current) formRef.current.reset()
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/room/${selectedRoom.id}`
            const { room_number, type, price, status } = room
            const payload = new FormData()
            payload.append("room_number", room_number || "")
            payload.append("type", type || "")
            payload.append("price", price.toString())
            payload.append("status", status || "")
            if (file) {
                payload.append("room_image", file)
            }

            const { data } = await put(url, payload, TOKEN)
            if (data?.status) {
                setIsShow(false)
                toast(data?.message, { hideProgressBar: true, containerId: "toastMenu", type: "success", autoClose: 2000 })
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(data?.message, { hideProgressBar: true, containerId: "toastMenu", type: "warning", autoClose: 2000 })
            }
        } catch (error: any) {
            console.error(error)
            const msg = error?.response?.data?.message || "Something went wrong"
            toast(msg, { hideProgressBar: true, containerId: "toastMenu", type: "error", autoClose: 2000 })
        }
    }

    return (
        <div>
            <ButtonPrimary type="button" onClick={openModal}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931ZM19.5 7.125L18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </ButtonPrimary>

            <Modal isShow={isShow} onClose={state => setIsShow(false)}>
                <form onSubmit={handleSubmit} ref={formRef}>
                    {/* modal header */}
                    <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
                        <div className="flex justify-between items-center">
                            <div>
                                <strong className="font-bold text-2xl">Update Room</strong>
                                <p className="text-slate-400 text-sm">Edit existing room data</p>
                            </div>
                            <button type="button" className="text-slate-400" onClick={() => setIsShow(false)}>
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* modal body */}
                    <div className="p-5">
                        <InputGroupComponent id="room_number" type="text" value={room.room_number} onChange={val => setRoom({ ...room, room_number: val })} required={true} label="Room Number" />
                        <InputGroupComponent id="price" type="number" value={room.price.toString()} onChange={val => setRoom({ ...room, price: Number(val) })} required={true} label="Price" />
                        <Select id="type" value={room.type} label="Type" required={true} onChange={val => setRoom({ ...room, type: val })}>
                            <option value="">--- Select Type ---</option>
                            <option value="standard">Standard</option>
                            <option value="deluxe">Deluxe</option>
                            <option value="suite">Suite</option>
                            <option value="family">Family</option>
                        </Select>
                        <Select id="status" value={room.status} label="Status" required={true} onChange={val => setRoom({ ...room, status: val })}>
                            <option value="">--- Select Status ---</option>
                            <option value="available">Available</option>
                            <option value="occupied">Occupied</option>
                            <option value="maintenance">Maintenance</option>
                        </Select>
                        <FileInput acceptTypes={["image/png", "image/jpeg", "image/jpg"]} id="room_image" label="Upload New Image (Optional)" onChange={f => setFile(f)} required={false} />
                    </div>

                    {/* modal footer */}
                    <div className="flex justify-end gap-2 p-5 border-t">
                        <ButtonDanger type="button" onClick={() => setIsShow(false)}>Cancel</ButtonDanger>
                        <ButtonPrimary type="submit">Save</ButtonPrimary>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default UpdateRoom
