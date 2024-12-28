import React from 'react';
import Banner from "../../components/Banner";
import styles from "../../pages/Favoritos/Favoritos.module.css";
import Card from "../../components/Card";
import { useFavoritosContext } from "../Context/Favoritos";

function Favoritos() {
  const { favorito, eliminarFavorito } = useFavoritosContext(); // Obtiene la lista de favoritos y la función para eliminar

  // Función para redirigir a YouTube
  const handlePlay = (video) => {
      const formattedVideoUrl = formatYouTubeURL(video);
      window.open(formattedVideoUrl, "_blank"); // Abre el video en una nueva pestaña
  };

  // Método para asegurar el formato correcto de la URL de YouTube
  const formatYouTubeURL = (url) => {
      if (url.startsWith('http')) {
          return url; // Ya está bien formada
      } else {
          return `https://www.youtube.com/watch?v=${url.split('watch?v=')[1]}`; // Formación estándar para URLs de YouTube
      }
  };

  return (
      <>
          <Banner img="favorite" color="#44d97d" />

          <section className={styles.container}>
              {favorito.map((fav) => (
                  <Card 
                      {...fav} 
                      key={fav.id} 
                      onDelete={() => eliminarFavorito(fav.id)} // Llama a eliminarFavorito en el click
                      onPlay={handlePlay} // Pasa la función onPlay a Card
                  />
              ))}
          </section>
      </>
  );
}

export default Favoritos;