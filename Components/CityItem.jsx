/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../Contexts/CitiesContext";
function CityItem({ city }) {
  const { cityName, date, id, position } = city;
  const { currCity, DeleteCity } = useCities();
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));
  function handleDelete(e) {
    e.preventDefault();
    DeleteCity(id);
  }
  return (
    <ul>
      <Link
        className={`${styles.cityItem} ${
          currCity.id === id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <p className={styles.name}>{cityName}</p>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </ul>
  );
}
export default CityItem;
