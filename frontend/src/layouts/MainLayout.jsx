import NavBar from "../components/ui/NavBar"
import Footer from "../components/ui/Footer"
import { Outlet } from "react-router-dom"
import React from "react";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const MainLayout = ({numberCartItems}) => {
  return (
    <>
    <NavBar numberCartItems={numberCartItems}/>
    <ToastContainer />
    <Outlet />
    <Footer />
    </>
  )
}

export default MainLayout