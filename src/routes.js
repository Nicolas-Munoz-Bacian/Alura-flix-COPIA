import Inicio from "../src/pages/inicio"
import NotFound from "../src/pages/NotFound";
import PaginaBase from "../src/pages/PaginaBase"
import Player from "../src/pages/Player"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function AppRoutes(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<PaginaBase/>}>
            <Route index element={<Inicio/>}></Route>
            <Route path=":id" element={<Player/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;