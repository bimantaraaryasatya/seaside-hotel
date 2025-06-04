import ManagerTemplate from "@/components/adminTemplate";
import MenuList from "../menuList";

export const metadata = {
   title: 'Guest Control Admin | Sea Side',
   description: 'Sea Side Hotel'
}

type PropsLayout = {
   children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
   return(
      <ManagerTemplate title="Guest" id="guest" menuList={MenuList}>
         {children}
      </ManagerTemplate>
   )
}

export default RootLayout