"use client"

import { BASE_API_URL } from "@/global"
import { storeCookie } from "@/lib/client-cookies"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { ToastContainer, toast } from "react-toastify"

const LoginUserPage = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/authUser/login`
            const payload = {email, password}
            const { data } = await axios.post(url, payload, {
                headers: { "Content-Type": "application/json" }
            })
            if (data.status == true) {
                toast(data.message, {hideProgressBar: true, containerId: `toastLogin`, type: "success", autoClose: 2000})
                storeCookie("token", data.token)
                storeCookie("id", data.data.id),
                storeCookie("name", data.data.name)
                storeCookie("email", data.data.email)
                storeCookie("role", data.data.role)
                let role = data.data.role
                if (role === 'admin'){
                    console.log("Redirecting to /user/admin/dashboard")
                    setTimeout(() => router.replace(`/user/admin/dashboard`), 1000)
                }
            }
            else toast(data.message, {hideProgressBar: true, containerId: `toastLogin`, type: "warning"})
        } catch (error) {
            console.log(error)
            toast(`Something went wrong`, {hideProgressBar: true, containerId: `toastLogin`, type: "error"})
        }
    }

    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <ToastContainer containerId={`toastLogin`} />
            <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Sign In</h2>
                <p className="text-md text-gray-700 text-center mb-6">Welcome User / Worker</p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                    placeholder="your@email.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                    placeholder="••••••••"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                    <input
                        type="checkbox"
                        className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-cyan-600 hover:text-cyan-500">
                    Forgot password?
                    </a>
                </div>

                <button
                    type="submit"
                    className="w-full bg-cyan-500 hover:bg-cyan-500 hover:cursor-pointer text-white font-medium py-2.5 rounded-lg transition-colors"
                >
                    Sign In
                </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    If you don't have an account, Ask admin
                </div>
            </div>
        </div>
    )
}

export default LoginUserPage