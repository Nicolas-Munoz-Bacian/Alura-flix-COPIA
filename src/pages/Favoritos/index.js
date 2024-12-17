import Banner from "../../components/Banner";
import styles from "../../pages/Favoritos/Favoritos.module.css";
import Titulo from "../../components/Titulo";
import Card from "../../components/Card";
import { useFavoritosContext } from "../Context/Favoritos";

function Favoritos() {
  const { favorito } = useFavoritosContext();

  return (
    <>
      <Banner img="favorite" color="#44d97d" />
      <section className={styles.container}>
        {favorito.map((fav) => {
          return <Card {...fav} key={fav.id} />;
        })}
      </section>
    </>
  );
}

export default Favoritos;
