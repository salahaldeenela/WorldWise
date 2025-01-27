/* eslint-disable react/prop-types */
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../Contexts/CitiesContext";
// eslint-disable-next-line react/prop-types
function CountryList() {
  const { cities, Loading } = useCities();
  if (Loading) return <Spinner />;

  // eslint-disable-next-line react/prop-types
  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );
  const countries = cities.reduce(
    (arr, city) => {
      if (!arr.map((el) => el.country).includes(city.country))
        return [...arr, { country: city.country, id: city.id }];
      else return arr;
    },

    []
  );
  return (
    <ul className={styles.countryList}>
      {
        // eslint-disable-next-line react/prop-types
        countries.map((country) => (
          <CountryItem country={country} key={country.id} />
        ))
      }
    </ul>
  );
}

export default CountryList;
