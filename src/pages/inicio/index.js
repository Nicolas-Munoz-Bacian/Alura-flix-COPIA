import { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import Titulo from "../../components/Titulo";
import Card from "../../components/Card";
import styles from "../inicio/";
import banner from "../inicio/front end.png";
import backend from "../inicio/back end.png";
import innovacionYgestion from "../inicio/innovación y gestión.png";

function Inicio() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/DaniRiverol/alura-cinema-api/videos")
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      });
  }, []);

  return (
    <>
      <Banner img="./img/eliminar" color="#154580" />
      
      <Titulo>
        <h1>Un lugar para guardar sus videos favoritos de Alura Latam</h1>
      </Titulo>

      {/* Sección Front End */}
      <Titulo>
        <img src={banner} className="front-end" alt="banner front end" />
      </Titulo>
      <Card id="1" titulo="Equipo Front End" capa="https://youtu.be/rpvrLaBQwgg?si=UmyErXE1Xc_WYR0D" />

      <section className={styles.container}>
        {videos.map(video => (
          <Card {...video} key={video.id} />
        ))}
      </section>
      
      {/* Sección Back End */}
      <Titulo>
        <img src={backend} className="back-end" alt="banner back end" />
      </Titulo>
      <Card id="2" titulo="Equipo Back End" capa="https://youtu.be/rpvrLaBQwgg?si=UmyErXE1Xc_WYR0D" />

      <section className={styles.container}>
        {videos.map(video => (
          <Card {...video} key={video.id} />
        ))}
      </section>
      
      {/* Sección Innovación y Gestión */}
      <Titulo>
        <img src={innovacionYgestion} className="innovacion-y-gestion" alt="banner innovación y gestion" />
      </Titulo>
      <Card id="3" titulo="Equipo innovación y gestión" capa="https://youtu.be/rpvrLaBQwgg?si=UmyErXE1Xc_WYR0D" />

      <section className={styles.container}>
        {videos.map(video => (
          <Card {...video} key={video.id} />
        ))}
      </section>
    </>
  );
}

export default Inicio;