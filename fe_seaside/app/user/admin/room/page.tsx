import { IRoom } from "@/app/types";
import { getCookies } from "@/lib/server-cookies";
import { BASE_API_URL, BASE_IMAGE_ROOM } from "@/global";
import { get } from "@/lib/api-bridge";
import DeleteRoom from "./deleteRoom";
import AddRoom from "./addRoom";
import UpdateRoom from "./updateRoom";
import Image from "next/image";
import Search from "./search"

const getRoom = async (search: string): Promise<IRoom[]> => {
    try {
        const TOKEN = await getCookies("token")
        const url = `${BASE_API_URL}/room?search=${search}`
        const response = await get(url, TOKEN)  // No destructuring

        if (!response || !response.data) {
            console.log("Invalid API response", response)
            return []
        }

        const { status, data } = response

        if (status && data.data && Array.isArray(data.data)) {
            return [...data.data]
        }
        
        let result: IRoom[] = []
        if(data?.status) result = [...data.data]
        return result
    } catch (error) {
        console.log(error)
        return []
    }   
}

const RoomPage = async ({searchParams}: {searchParams: {[key:string]: string | string[] | undefined}}) => {
    const search = searchParams.search ? searchParams.search.toString() : ``
    const room: IRoom[] = await getRoom(search)
    return(
        <div className="m-2 bg-white rounded-lg p-3 border-t-4 border-t-cyan-500 shadow-md">
            <h4 className="text-xl font-bold mb-2 text-black">Room Data</h4>
            <p className="text-sm text-gray-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit</p>
            <div className="flex justify-between items-center mb-4 mt-2">
                <div className="flex items-center w-full max-w-md flex-grow">
                    <Search url={`/user/admin/room`} search={search}/>
                </div>
                <div className="ml-4">
                    <AddRoom />
                </div>
            </div>

            {
                room.length == 0 ?
                    <p className="text-black">Tidak ada data</p>
                :
                <>
                    <div className="flex flex-col gap-4">
                        {room.map((data, index) => (
                            <div key={`keyPresentasi${index}`} className={`flex flex-wrap shadow`}>
                                <div className="w-full md:w-1/12 p-2">
                                    <small className="text-sm font-bold text-cyan-500">
                                        Image
                                    </small> <br /> 
                                    <Image 
                                        src={`${BASE_IMAGE_ROOM}/${data.room_image}`}
                                        alt="Room Image"
                                        width={65}
                                        height={65}
                                        className="rounded-full border border-gray-300 object-cover w-16 h-16"
                                    />
                                </div>
                                <div className="w-full md:w-2/12 p-2">
                                    <small className="text-sm font-bold text-cyan-500">
                                        Room Number
                                    </small> <br /> {data.room_number}
                                </div>
                                <div className="w-full md:w-2/12 p-2 break-words whitespace-normal">
                                    <small className="text-sm font-bold text-cyan-500">
                                        Price
                                    </small> <br /> {data.price}
                                </div>
                                <div className="w-full md:w-2/12 p-2">
                                    <small className="text-sm font-bold text-cyan-500">
                                        Type
                                    </small> <br /> {data.type}
                                </div>
                                <div className="w-full md:w-2/12 p-2">
                                    <small className="text-sm font-bold text-cyan-500">
                                        Status
                                    </small> <br /> {data.status}
                                </div>
                                <div className="w-full md:w-2/12 p-2">
                                    <small className="text-sm font-bold text-cyan-500">
                                        Action
                                    </small> <br />
                                    <div className="flex gap-1">
                                        <UpdateRoom selectedRoom={data}/>
                                        <DeleteRoom selectedRoom={data}/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            }
        </div>
    )
}

export default RoomPage