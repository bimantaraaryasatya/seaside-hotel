import ManagerTemplate from "@/components/adminTemplate";
import MenuList from "../menuList";

export const metadata = {
   title: 'Room Control Admin | Sea Side',
   description: 'Sea Side Hotel'
}

type PropsLayout = {
   children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
   return(
      <ManagerTemplate title="Room" id="room" menuList={MenuList}>
         {children}
      </ManagerTemplate>
   )
}

export default RootLayout