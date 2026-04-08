

import SideBar from '../../components/layout/SideMenu'
import Navbar from '../../components/layout/Navbar'
import SidebarProvider from '../../components/wrapper/SidebarProvider'
import SidebarOverlay from '../../components/wrapper/SidebarOverlay'


const DashboardLayout = ({children}:any) => {

  return (
    <SidebarProvider>
    <div className='flex min-h-screen'>
     
        <SideBar/>
     <SidebarOverlay/>
   
      <div className='flex-1 lg:ml-52'>
        <header>
            <Navbar/>
        </header>

        <main className='p-5 mt-10'>
            {children}
            
        </main>
      </div>
    </div>
    </SidebarProvider>
  )
}

export default DashboardLayout

