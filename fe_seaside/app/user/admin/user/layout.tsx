import ManagerTemplate from "@/components/adminTemplate";
import MenuList from "../menuList";

export const metadata = {
   title: 'User Control Admin | Sea Side',
   description: 'Sea Side Hotel'
}

type PropsLayout = {
   children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
   return(
      <ManagerTemplate title="User" id="user" menuList={MenuList}>
         {children}
      </ManagerTemplate>
   )
}

export default RootLayout