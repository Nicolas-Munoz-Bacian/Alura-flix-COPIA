import styles from "../../components/Titulo/Titulo.module.css"

function Titulo ({children}){
    return(
        <div className={styles.texto}>

            {children}
        </div>
    )
}

export default Titulo