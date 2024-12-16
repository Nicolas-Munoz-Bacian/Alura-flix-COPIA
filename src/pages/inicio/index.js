import Titulo from "../../components/Titulo";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import styles from "../../pages/inicio/index.module.css";
import home from "../../pages/inicio/home.jpg"
import frontend from "../../pages/inicio/front end.png";
import backend from "../../pages/inicio/back end.png";
import innovacionYgestion from "../inicio/innovación y gestión.png";
import { useState, useEffect } from "react";

function Inicio() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(
      "https://my-json-server.typicode.com/DaniRiverol/alura-cinema-api/videos"
    )
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      });
  }, []);
  return (
    <>
      <Banner src={home} img="home" color="#154580" />

      {/* Sección Front End */}
      <Titulo>
        <img src={frontend} className="banner" alt="banner front end" />
      </Titulo>

      <section className={styles.container}>
        {videos.map((video) => {
          return <Card {...video} key={video.id} />;
        })}
      </section>

      {/* Sección Back End */}
      <Titulo>
        <img src={backend} className="banner" alt="banner back end" />
      </Titulo>

      <section className={styles.container}>
        {videos.map((video) => {
          return <Card {...video} key={video.id} />;
        })}
      </section>

      {/* Sección Innovación y Gestión */}
      <Titulo>
        <img src={innovacionYgestion} className="banner" alt="banner innovación y gestion" />
      </Titulo>
      <section className={styles.container}>
        {videos.map(video => (
          <Card {...video} key={video.id} />
        ))}
      </section>
    </>
  );
}

export default Inicio;
