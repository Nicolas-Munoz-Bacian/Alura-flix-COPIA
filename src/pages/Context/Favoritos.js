import { createContext, useContext, useState } from "react";

// Crear el contexto
export const FavoritosContext = createContext();
FavoritosContext.displayName = "Favoritos";

export default function FavoritoProvider({ children }) {
    const [favorito, setFavorito] = useState([]);

    // Función para agregar o eliminar del favorito
    const agregarFavorito = (nuevoFavorito) => {
        const favoritoRepetido = favorito.some(
            (item) => item.id === nuevoFavorito.id
        );
        let nuevaLista = [...favorito];
        if (!favoritoRepetido) {
            nuevaLista.push(nuevoFavorito); // Agrega nuevo favorito si no existe
        } else {
            // Elimina el favorito si ya existe
            nuevaLista = favorito.filter((item) => item.id !== nuevoFavorito.id);
        }
        setFavorito(nuevaLista); // Actualiza el estado
    };

    // Función para eliminar un favorito por su ID
    const eliminarFavorito = (videoId) => {
        setFavorito(prev => prev.filter(video => video.id !== videoId)); // Elimina solo el favorito especificado
    };

    return (
        <FavoritosContext.Provider value={{ favorito, agregarFavorito, eliminarFavorito }}>
            {children}
        </FavoritosContext.Provider>
    );
}

// Hook para usar el contexto
export function useFavoritosContext() {
    return useContext(FavoritosContext); // Retorna el contexto
}