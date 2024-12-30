import Titulo from "../../components/Titulo";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import styles from "../../pages/inicio/index.module.css";
import home from "../../pages/inicio/home.jpg";
import frontend from "../../pages/inicio/front end.png";
import backend from "../../pages/inicio/back end.png";
import innovacionYgestion from "../inicio/innovación y gestión.png";
import videosData from "../../components/data/db.json"
import { useState, useEffect } from "react";
import EditModal from "../../pages/ModalEditarCard/modal";
import NuevaCard from "../../pages/NuevaCard/NuevaCard"

function Inicio() {
  const [videos, setVideos] = useState(videosData.videos); // Carga los videos desde db.json
  const [showModal, setShowModal] = useState(false);
  const [videoToEdit, setVideoToEdit] = useState(null);
  const [showNuevaCardModal, setShowNuevaCardModal] = useState(false); // Para el modal de nueva tarjeta

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/DaniRiverol/alura-cinema-api/videos")
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      });
  }, []);

  const handleEdit = (video) => {
    setVideoToEdit(video);
    setShowModal(true);
  };

  const handleSave = (updatedVideo) => {
    const updatedVideos = videos.map((video) => 
      video.id === updatedVideo.id ? updatedVideo : video
    );
    setVideos(updatedVideos); // Actualiza la lista de videos
    setShowModal(false);
    setVideoToEdit(null); // Limpia el video seleccionado para editar
  };

  const handleDelete = (videoId) => {
    const updatedVideos = videos.filter((video) => video.id !== videoId); // Borra el video seleccionado
    setVideos(updatedVideos); // Actualiza la lista de videos
  };

  const handleClear = () => {
    setVideoToEdit(null);
    setShowModal(false);
  };

  // Maneja la adición de un nuevo video desde el modal
  const handleUpdateVideos = (newVideo) => {
    setVideos((prevVideos) => [...prevVideos, newVideo]); // Agrega el nuevo video a la lista
    setShowNuevaCardModal(false); // Cierra el modal de NuevaCard
  };

  // Abre el modal de NuevaCard
  const handleNuevaCard = () => {
    setShowNuevaCardModal(true);
  };

  // Datos estáticos de videos
  const staticVideos = videosData.videos;

  return (
    <>
      <Banner src={home} img="home" color="#154580" />
                 {/* Botón para agregar nueva tarjeta */}
      {/* Mostrar componente NuevaCard si showNuevaCard es true */}
      <p style={{ textAlign: 'center', margin: '1em 125px' }}>
        Challenge AluraFlix.<p></p>
        Aquí puedes ver los videos a continuación y crear nuevas cartas con URLs 
        de videos e imágenes de internet 
        por cada sección y guardarlos en favoritos según sea tu gusto.
      </p>

      {/* Sección Front End */}
      <Titulo>
        <img src={frontend} className="banner" alt="banner front end" />
      </Titulo>
      <section className={styles.container}>
        {staticVideos.filter(video => video.descripcion === "Front-End").map(video => (
          <Card
            {...video}
            key={video.id}
            onEdit={() => handleEdit(video)}
            onDelete={() => handleDelete(video.id)}
            onSave={handleSave}
            onClear={handleClear}
          />
        ))}
      </section>

      {/* Sección Back End */}
      <Titulo>
        <img src={backend} className="banner" alt="banner back end" />
      </Titulo>
      <section className={styles.container}>
        {staticVideos.filter(video => video.descripcion === "Back End").map(video => (
          <Card
            {...video}
            key={video.id}
            onEdit={() => handleEdit(video)}
            onDelete={() => handleDelete(video.id)}
            onSave={handleSave}
            onClear={handleClear}
          />
        ))}
      </section>

      {/* Sección Innovación y Gestión */}
      <Titulo>
        <img src={innovacionYgestion} className="banner" alt="banner innovación y gestion" />
      </Titulo>
      <section className={styles.container}>
        {staticVideos.filter(video => video.descripcion === "Innovación y Gestión").map(video => (
          <Card
            {...video}
            key={video.id}
            onEdit={() => handleEdit(video)}
            onDelete={() => handleDelete(video.id)}
            onSave={handleSave}
            onClear={handleClear}
          />
        ))}
      </section>

      {/* Modal de Edición */}
      {showModal && (
        <EditModal
          initialData={videoToEdit}
          onClose={handleClear}
          onSave={handleSave}
        />
      )}
      {NuevaCard && (
        <NuevaCard initialVideos={videos} onUpdateVideos={handleUpdateVideos} />
      )}
    </>
  );
}

export default Inicio;