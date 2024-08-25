import { Outlet } from 'react-router-dom'
import Header from '../Header/Index'
import Footer from '../Footer/Index'

const MainLayout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}


export default MainLayout
