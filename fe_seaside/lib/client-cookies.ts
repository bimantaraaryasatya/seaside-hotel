import Cookies from "js-cookie"
import { Cookie } from "next/font/google"

export const getCookie = (key: string) => {
    return Cookies.get(key)
}

export const storeCookie = (key: string, plainText: string) => {
    Cookies.set(key, plainText, {expires: 1})
}

export const removeCookie = (key: string) => {
    Cookies.remove(key)
}