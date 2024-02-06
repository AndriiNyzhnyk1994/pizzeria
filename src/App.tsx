import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import './scss/app.scss';
import MainLayout from "./layouts/MainLayout";
import React, { Suspense } from "react";

const Cart = React.lazy( () => import(/* webpachChunkName: "Cart" */ './pages/Cart') )
const FullPizza = React.lazy( () => import(/* webpachChunkName: "Cart" */ './pages/FullPizza') )
const NotFound = React.lazy( () => import(/* webpachChunkName: "Cart" */ './pages/NotFound') )


function App() {

 
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Suspense fallback={<div>Loading...</div>}><Cart /></Suspense> } />
        <Route path="/pizza/:id" element={<Suspense fallback={<div>Loading...</div>}><FullPizza/></Suspense>} />
        <Route path="*" element={<Suspense fallback={<div>Loading...</div>}><NotFound/></Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;
