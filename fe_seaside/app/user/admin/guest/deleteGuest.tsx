"use client"

import { IGuest } from "@/app/types"
import { BASE_API_URL } from "@/global"
import { drop } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast} from "react-toastify"
import { ButtonPrimary, ButtonDanger } from "@/components/buttonComponent"
import Modal from "@/components/modal"
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const DeleteGuest = ({ selectedGuest }: { selectedGuest: IGuest }) => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [guest, setGuest] = useState<IGuest>({...selectedGuest})
    const router = useRouter()
    const TOKEN = getCookie("token") || ""
    const openModal = () => {
        setGuest({...selectedGuest})
        setIsShow(true)
    }
    const handleSubmit = async (e: FormEvent) => {
       try {
           e.preventDefault()
           const url = `${BASE_API_URL}/guest/${selectedGuest.id}`
           const { data } = await drop(url, TOKEN)
           if (data?.status) {
               setIsShow(false)
               toast(data?.message, { hideProgressBar: true, containerId: `toastMenu`, type: `success`, autoClose: 2000})
               setTimeout(() => router.refresh(), 1000)
           } else {
               toast(data?.message, { hideProgressBar: true, containerId: `toastMenu`, type: `warning`, autoClose: 2000})
           }
       } catch (error) {
           console.log(error);
           toast(`Something Wrong`, { hideProgressBar: true, containerId: `toastMenu`, type: `error`, autoClose: 2000})
       }
   }

   return(
    <div>
        <ButtonDanger type="button" onClick={() => openModal()}>
            <MdDelete />
        </ButtonDanger>
        <Modal isShow={isShow} onClose={state => setIsShow(state)}>
            <form onSubmit={handleSubmit}>
                <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
                    <div className="w-full flex items-center">
                        <div className="flex flex-col">
                            <strong className="font-bold text-2xl">
                                Delete Guest
                            </strong>
                            <small className="text-slate-400 text-sm">
                                Are you sure to delete guest?
                            </small>
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
                    Are you sure you want to delete {guest.full_name}?
                </div>

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
            </form>
        </Modal>
    </div>
   )
}

export default DeleteGuest