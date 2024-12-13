import Banner from "../../components/Banner";
import styles from "../Player/Player.module.css";
import Titulo from "../../components/Titulo";
import { useParams } from "react-router-dom";
import videos from "../../components/data/db.json"

function Player(){
const parametros = useParams()
const video= videos.find(video=> video.id) === Number((parametros.id))
console.log(video);
    return(
        <>
        <Banner img="player" color="#58B9AE"/>
        <Titulo>
            <h1>Player</h1>
        </Titulo>
        <section className={styles.container}>
            <ifrmae width="360" height="315"
            src="https://youtu.be/rpvrLaBQwgg?si=UmyErXE1Xc_WYR0D"
            tittle="Grupo Front End"
            frameborder="0" allow="accelerometer; autoplay; clipboard-write;"
            ></ifrmae>
        </section>
        <section className={styles.container}>
            <ifrmae width="360" height="315"
            src="https://youtu.be/rpvrLaBQwgg?si=UmyErXE1Xc_WYR0D"
            tittle="Grupo Back-End"
            frameborder="0" allow="accelerometer; autoplay; clipboard-write;"
            ></ifrmae>
        </section>
        <section className={styles.container}>
            <ifrmae width="360" height="315"
            src="https://youtu.be/rpvrLaBQwgg?si=UmyErXE1Xc_WYR0D"
            tittle="Grupo Equipo Innovación y Gestión"
            frameborder="0" allow="accelerometer; autoplay; clipboard-write;"
            ></ifrmae>
        </section>
        </>
    )
}

export default  Player;