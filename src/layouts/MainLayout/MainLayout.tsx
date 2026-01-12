import { Outlet } from "react-router-dom"
import Sidebar from "../../components/Sidebar/Sidebar"
import "./MainLayout.scss"

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <main className="main-layout__content">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
