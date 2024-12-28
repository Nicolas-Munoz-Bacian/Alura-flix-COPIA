import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Banner from "../../components/Banner";
import Titulo from "../../components/Titulo";
import NotFound from "../../pages/NotFound";
import styles from "../../pages/Player/Player.module.css";
import videos from "../../components/data/db.json";

function Player() {
    const [video, setVideo] = useState(null);
    const parametros = useParams();

    useEffect(() => {
        // Encuentra el video utilizando el parámetro 'id'
        const videoEncontrado = videos.videos.find(video => video.id === Number(parametros.id));
        if (videoEncontrado) {
            const videoURL = convertToEmbedURL(videoEncontrado.link); // Usar 'link' para obtener la URL embebida
            setVideo({ ...videoEncontrado, video: videoURL }); // Agregar video embebido al estado
        }
    }, [parametros.id]);

    const convertToEmbedURL = (url) => {
        // Asegúrate de que url es de tipo string
        if (typeof url !== 'string') {
            console.error('La URL debe ser una cadena de texto');
            return '';
        }
        
        // Transformar URLs estándar y acortadas de YouTube para ser embebidas
        if (url.includes('youtu.be/')) {
            return url.replace('youtu.be/', 'www.youtube.com/embed/');
        }
        if (url.includes('watch?v=')) {
            const videoID = url.split('watch?v=')[1].split('&')[0]; // Extrae solo el VideoID
            return `https://www.youtube.com/embed/${videoID}`;
        }
        return url; // Retorna la URL sin cambios si no son de YouTube
    };

    if (!video) return <NotFound />; // Si no se encontró el video, muestra NotFound
    
    return (
        <>
            <Banner img="player" color="#58B9AE" />
            <Titulo>
                <h1>{video.titulo}</h1> {/* Muestra el título del video */}
            </Titulo>
            <section className={styles.container}>
                <iframe 
                    width="100%" 
                    height="80vh" 
                    src={video.video} // Usa el campo de video embebido
                    title={video.titulo} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                />
            </section>
        </>
    );
}

export default Player;