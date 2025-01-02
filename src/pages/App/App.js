import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "../../pages/inicio/index";
import NuevaCard from "../../pages/NuevaCard/NuevaCard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/NuevaCard" element={<NuevaCard />} /> {/* Ruta para NuevaCard */}
        {/* ... otras rutas ... */}
      </Routes>
    </Router>
  );
}

export default App;