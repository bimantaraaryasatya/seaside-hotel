export const metadata = {
   title: 'Login Guest | Sea Side',
   description: 'Hotel Sea Side',
}

type PropsLayout = {
   children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
   return (
       <div>{children}</div>
   )
}

export default RootLayout
