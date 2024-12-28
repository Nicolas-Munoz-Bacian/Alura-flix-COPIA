import Inicio from "../src/pages/inicio"
import NotFound from "../src/pages/NotFound";
import PaginaBase from "../src/pages/PaginaBase"
import Player from "../src/pages/Player"
import Favoritos from "../src/pages/Favoritos";
import NuevaCard from "../src/pages/NuevaCard/NuevaCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function AppRoutes(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<PaginaBase/>}>
            <Route index element={<Inicio/>}></Route>
            <Route path=":id" element={<Player/>}></Route>
            <Route path="NuevaCard" element={<NuevaCard />}></Route>
            <Route path="favoritos" element={<Favoritos />}></Route>
            <Route path="*" element={<NotFound/>}></Route>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;