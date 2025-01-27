// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useURLPosition } from "../Hooks/useURLPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../Contexts/CitiesContext";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?";
function Form() {
  const { CreateCity } = useCities();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const [lat, lng] = useURLPosition();
  const [isLoading, setIsLoading] = useState(false);
  const [geoLocationError, setGeoLocationError] = useState("");

  useEffect(
    function () {
      async function fetchCityData() {
        try {
          if (!lat && !lng) return;
          setGeoLocationError("");
          setIsLoading(true);
          const res = await fetch(
            `${BASE_URL}latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryCode)
            throw new Error("that doesnt seem to be a city");
          setCityName(data.city || data.countryName || "");
          setCountry(data.countryName || "");
        } catch (err) {
          setGeoLocationError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );
  function handleSubmit(e) {
    e.preventDefault();
    if (!date || !cityName) return;
    const newCity = { cityName, date, notes, position: { lat, lng } };
    CreateCity(newCity);
    navigate("/app/cities");
  }

  if (geoLocationError) return <Message message={geoLocationError} />;
  if (isLoading) return <Spinner />;
  if (!lat && !lng) return <Message message={"try clicking  on the map"} />;
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          dateFormat={"dd/MM/yyyy"}
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
