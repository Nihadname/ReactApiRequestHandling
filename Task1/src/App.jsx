
import { Route, Routes } from "react-router-dom";
import MainLayout from './Layout/MainLayout/Index';
import Home from './Pages/Home/Index';
import './App.css';
import React from "react";
import Products from "./Pages/Products/Index";

function App() {
  
  

 
    return (
       <React.Fragment>
            {/* Routing */}
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path='/' index element={<Home />} />
                    <Route path='/Products' index element={<Products />} />

                </Route>
            </Routes>
       </React.Fragment>
           
       
    );
}

export default App;
