import Titulo from "../../components/Titulo";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import styles from "../../pages/inicio/index.module.css";
import home from "../../pages/inicio/home.jpg"
import frontend from "../../pages/inicio/front end.png";
import backend from "../../pages/inicio/back end.png";
import innovacionYgestion from "../inicio/innovación y gestión.png";
import { useState, useEffect } from "react";
import EditModal from "../../pages/ModalEditarCard/modal";
import NuevaCard from "../../pages/NuevaCard/NuevaCard"

function Inicio() {
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [videoToEdit, setVideoToEdit] = useState(null); // Estado para guardar el video a editar

  useEffect(() => {
    fetch(
      "https://my-json-server.typicode.com/DaniRiverol/alura-cinema-api/videos"
    )
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
    const updatedVideos = videos.map((video) => {
      if (video.id === updatedVideo.id) {
        return updatedVideo;
      }
      return video;
    });
    setVideos(updatedVideos);
    setShowModal(false);
    setVideoToEdit(null);
  };

  const addVideo = (newVideo) => {
    setVideos([...videos, newVideo]);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVideoToEdit(null);
  };

  const handleDelete = (videoId) => {
    const updatedVideos = videos.filter((video) => video.id !== videoId);
    setVideos(updatedVideos);
  };

  const handleClear = () => {
    setVideoToEdit(null);
    setShowModal(false);
  };

  return (
    <>
      <Banner src={home} img="home" color="#154580" />

      {/* Sección Front End */}
      <Titulo>
        <img src={frontend} className="banner" alt="banner front end" />
      </Titulo>

      <section className={styles.container}>
        {videos.map((video) => (
        <Card
        {...video}
        key={video.id}
        onEdit={() => handleEdit(video)}
        onDelete={() => handleDelete(video.id)}
        onSave={handleSave}
        onClear={handleClear} // Pasa la función handleClear como prop
      />
    ))}
      </section>

      {/* Sección Back End */}
      <Titulo>
        <img src={backend} className="banner" alt="banner back end" />
      </Titulo>

      <section className={styles.container}>
        {videos.map((video) => (
        <Card
        {...video}
        key={video.id}
        onEdit={() => handleEdit(video)}
        onDelete={() => handleDelete(video.id)} // Pasa la función handleDelete como prop
      />
        ))}
      </section>

      {/* Sección Innovación y Gestión */}
      <Titulo>
        <img src={innovacionYgestion} className="banner" alt="banner innovación y gestion" />
      </Titulo>
      <section className={styles.container}>
        {videos.map((video) => (
        <Card
        {...video}
        key={video.id}
        onEdit={() => handleEdit(video)}
        onDelete={() => handleDelete(video.id)} // Pasa la función handleDelete como prop
      />
        ))}
      </section>
      <>
    </>

    </>
  );
}

export default Inicio;
