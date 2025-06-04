import { IGuest } from "@/app/types";
import { getCookies } from "@/lib/server-cookies";
import { BASE_API_URL } from "@/global";
import { get } from "@/lib/api-bridge";
import AddGuest from "./addGuest";
import DeleteGuest from "./deleteGuest";
import UpdateGuest from "./updateGuest";
import Search from "./search";

const getGuest = async (search: string): Promise<IGuest[]> => {
    try {
        const TOKEN = await getCookies("token")
        const url = `${BASE_API_URL}/guest?search=${search}`
        const response = await get(url, TOKEN)  // No destructuring

        if (!response || !response.data) {
            console.log("Invalid API response", response)
            return []
        }

        const { status, data } = response

        if (status && data.data && Array.isArray(data.data)) {
            return [...data.data]
        }
        
        let result: IGuest[] = []
        if(data?.status) result = [...data.data]
        return result
    } catch (error) {
        console.log(error)
        return []
    }   
}

const GuestPage = async ({searchParams}: {searchParams: {[key:string]: string | string[] | undefined}}) => {
    const search = searchParams.search ? searchParams.search.toString() : ``
    const guest: IGuest[] = await getGuest(search)
    return(
        <div className="m-2 bg-white rounded-lg p-3 border-t-4 border-t-cyan-500 shadow-md">
            <h4 className="text-xl font-bold mb-2 text-black">Guest Data</h4>
            <p className="text-sm text-gray-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit</p>
            <div className="flex justify-between items-center mb-4 mt-2">
                <div className="flex items-center w-full max-w-md flex-grow">
                    <Search url={`/user/admin/guest`} search={search}/>
                </div>
                <div className="ml-4">
                    <AddGuest/>
                </div>
            </div>

            {
                guest.length == 0 ?
                    <p className="text-black">Tidak ada data</p>
                :
                <>
                    <div className="flex flex-col gap-4">
                        {guest.map((data, index) => (
                            <div key={`keyPresentasi${index}`} className={`flex flex-wrap shadow`}>
                                <div className="w-full md:w-2/12 p-2">
                                    <small className="text-sm font-bold text-cyan-500">
                                        Name
                                    </small> <br /> {data.full_name}
                                </div>
                                <div className="w-full md:w-2/12 p-2 break-words whitespace-normal">
                                    <small className="text-sm font-bold text-cyan-500">
                                        Email
                                    </small> <br /> {data.email}
                                </div>
                                <div className="w-full md:w-2/12 p-2">
                                    <small className="text-sm font-bold text-cyan-500">
                                        Phone
                                    </small> <br /> {data.phone}
                                </div>
                                <div className="w-full md:w-4/12 p-2">
                                    <small className="text-sm font-bold text-cyan-500">
                                        Adress
                                    </small> <br /> {data.address}
                                </div>
                                <div className="w-full md:w-2/12 p-2">
                                    <small className="text-sm font-bold text-cyan-500">
                                        Action
                                    </small> <br />
                                    <div className="flex gap-1">
                                        <UpdateGuest selectedGuest={data}/>
                                        <DeleteGuest selectedGuest={data}/>
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

export default GuestPage