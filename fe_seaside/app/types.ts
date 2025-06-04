export interface IGuest{
    id: number,
    full_name: string,
    email: string,
    password: string,
    phone: string,
    address: string,
    createdAt: string,
    updatedAt: string
}

export interface IUser{
    id: number,
    name: string,
    email: string,
    password: string,
    role: string,
    createdAt: string,
    updatedAt: string
}

export interface IRoom{
    id: number,
    room_number: string,
    type: string,
    price: number,
    status: string,
    room_image: string,
    createdAt: string,
    updatedAt: string
}