import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../Contexts/CitiesContext";

// eslint-disable-next-line react/prop-types
function CityList() {
  const { cities, Loading } = useCities();

  if (Loading) return <Spinner />;

  // eslint-disable-next-line react/prop-types
  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );
  return (
    <ul className={styles.cityList}>
      {
        // eslint-disable-next-line react/prop-types
        cities.map((city) => (
          <CityItem city={city} key={city.id} />
        ))
      }
    </ul>
  );
}

export default CityList;
