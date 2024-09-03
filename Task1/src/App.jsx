
import { Route, Routes } from "react-router-dom";
import MainLayout from './Layout/MainLayout/Index';
import Home from './Pages/Home/Index';
import './App.css';
import React from "react";
import Products from "./Pages/Products/Index";
import Register from "./Pages/Register/Index";
import Login from "./Pages/Login/Index";

function App() {
  
  

 
    return (
       <React.Fragment>
            {/* Routing */}
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path='/' index element={<Home />} />
                    <Route path='/Products' index element={<Products />} />

                </Route>
                <Route path='/Register' index element={<Register />} />
                <Route path='/login' index element={<Login />} />


            </Routes>
       </React.Fragment>
           
       
    );
}

export default App;
