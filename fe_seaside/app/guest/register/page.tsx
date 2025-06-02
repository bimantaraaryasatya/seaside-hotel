"use client"

import { BASE_API_URL } from "@/global"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { ToastContainer, toast } from "react-toastify"

export interface RegisterData{
    name: string,
    email: string,
    password: string,
    phone: string,
    address: string
}

const RegisterGuestPage = () => {
    const [guest, setGuest] = useState<RegisterData>({
        name:  "",
        email: "",
        password: "",
        phone: "",
        address: "",
    })
    const router = useRouter()

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;
        setGuest((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const url = `${BASE_API_URL}/authGuest/register`

        const payload = new FormData()
        payload.append("name", guest.name)
        payload.append("email", guest.email)
        payload.append("password", guest.password)
        payload.append("phone", guest.phone)
        payload.append("address", guest.address)

        try {
            const { data } = await axios.post(url, payload, {
                headers: { "Content-Type": "application/json" }
            })
            if(data.status == true){
                toast(data.message, {hideProgressBar: true, containerId: `toastRegister`, type: "success", autoClose: 2000})
                setTimeout(() => router.replace('/guest/login'), 1000)
            }
            else toast(data.message, {hideProgressBar: true, containerId: `toastLogin`, type: "warning"})
        } catch (error) {
            console.log(error)
            toast(`Something went wrong`, {hideProgressBar: true, containerId: `toastLogin`, type: "error"})
        }
    }

    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <ToastContainer containerId={`toastRegister`} />
            <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Sign Up</h2>
                <p className="text-md text-gray-700 text-center mb-6">Welcome Guest</p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                        name="name"
                        type="text"
                        value={guest.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-black"
                        placeholder="Ex: John"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                        name="email"
                        type="email"
                        value={guest.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-black"
                        placeholder="Ex: your@email.com"
                        autoComplete="off"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                        name="password"
                        type="password"
                        value={guest.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-black"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                        name="phone"
                        type= "number"
                        value={guest.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-black"
                        placeholder="Ex: 08132321"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adress</label>
                        <textarea
                        name="address"
                        value={guest.address}
                        onChange={handleChange}
                        className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-black"
                        placeholder="Ex: Jl.Halo"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-500 hover:cursor-pointer text-white font-medium py-2.5 rounded-lg transition-colors"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account? <a href="/guest/login" className="text-cyan-500">Sign In</a>
                </div>
            </div>
        </div>
    )
}

export default RegisterGuestPage