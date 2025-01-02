import Titulo from "../../components/Titulo";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import styles from "../../pages/inicio/index.module.css";
import home from "../../pages/inicio/home.jpg";
import frontend from "../../pages/inicio/front end.png";
import backend from "../../pages/inicio/back end.png";
import innovacionYgestion from "../inicio/innovación y gestión.png";
import { useState, useEffect } from "react";
import EditModal from "../../pages/ModalEditarCard/modal";
import NuevaCard from "../../pages/NuevaCard/NuevaCard";
import videosData from "../../components/data/db.json";

function Inicio() {
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [videoToEdit, setVideoToEdit] = useState(null);
  const [showNuevaCardModal, setShowNuevaCard]= useState(false);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/DaniRiverol/alura-cinema-api/videos")
    const storedVideos = JSON.parse(localStorage.getItem('videos')) || [];
    setVideos(storedVideos);
  }, []);

  const handleEdit = (video) => {
    setVideoToEdit(video);
    setShowModal(true);
  };

  const handleSave = (updatedVideo) => {
    const updatedVideos = videos.map(video => {
      if (video.id === updatedVideo.id) {
        return updatedVideo; // Return the updated video
      } else {
        return video; // Return the original video
      }
    });
    setVideos(updatedVideos);
    localStorage.setItem('videos', JSON.stringify(updatedVideos));
    setShowModal(false);
    setVideoToEdit(null);
  };

  const handleDelete = (videoId) => {
    const updatedVideos = videos.filter((video) => video.id !== videoId); 
    setVideos(updatedVideos); 
    localStorage.setItem('videos', JSON.stringify(updatedVideos));
  };

  const handleClear = () => {
    setVideoToEdit(null);
    setShowModal(false);
  };

  const handleUpdateVideos = (newVideo) => {
    const updatedVideos = [...videos, newVideo];
    localStorage.setItem('videos', JSON.stringify(updatedVideos));
    setVideos(updatedVideos); 
    setShowNuevaCard(false); 
  };

  const handleNuevaCard = () => {
    setShowNuevaCard(true);
  };
  return (
    <>
      <Banner src={home} img="home" color="#154580" />
      {/* Modal para agregar nueva tarjeta */}
      <button onClick={handleNuevaCard}>Nuevo video</button>
      {showNuevaCardModal && (
        <NuevaCard onUpdateVideos={handleUpdateVideos} />
      )}
      <p style={{ textAlign: 'center', margin: '1em 125px' }}>
        Challenge AluraFlix.<p></p>
        Aquí puedes ver los videos a continuación y crear nuevas cartas con URLs
        de videos e imágenes de internet
        por cada sección y guardarlos en favoritos según prefieras.
      </p>

      {/* Sección Front End */}
      <Titulo>
        <img src={frontend} className="banner" alt="banner front end" />
      </Titulo>
      <section className={styles.container}>
        {videos.filter(video => video.categoria === "Front-End").map(video => (
          <Card
            {...video}
            key={video.id}
            onEdit={handleEdit}
            onDelete={handleDelete}
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
        {videos.filter(video => video.categoria === "Back-End").map(video => (
          <Card
            {...video}
            key={video.id}
            onEdit={handleEdit}
            onDelete={handleDelete}
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
        {videos.filter(video => video.categoria === "Innovación y Gestión").map(video => (
          <Card
            {...video}
            key={video.id}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSave={handleSave}
            onClear={handleClear}
          />
        ))}
      </section>
      {videos.map((video) => (
        <Card
          key={video.id}
          {...video}
          onEdit={() => handleEdit(video)}
          onDelete={() => handleDelete(video.id)}
          onSave={handleSave}
        />
      ))}
      {showModal && (
        <EditModal
          initialData={videoToEdit}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
}

export default Inicio;