import ManagerTemplate from "@/components/adminTemplate";
import MenuList from "../menuList";

export const metadata = {
   title: 'Dashboard Admin | Sea Side',
   description: 'Sea Side Hotel'
}

type PropsLayout = {
   children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
   return(
      <ManagerTemplate title="Dashboard" id="dashboard" menuList={MenuList}>
         {children}
      </ManagerTemplate>
   )
}

export default RootLayout