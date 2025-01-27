import { createContext, useContext, useEffect, useReducer } from "react";

// Create a context
const CitiesContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "cities/loading":
      return { ...state, loading: true };
    case "cities/loaded":
      return { ...state, loading: false, cities: action.payload };
    case "city/loading":
      return { ...state, loading: false };
    case "city/loaded":
      return { ...state, loading: true, currCity: action.payload };
    case "createCity/loading":
      return { ...state, loading: true };

    case "createCity/loaded":
      return {
        ...state,
        loading: false,
        cities: [...state.cities, action.payload],
        currCity: action.payload,
      };
    case "createDelete/loading":
      return { ...state, loading: true };
    case "createDelete/loaded":
      return {
        ...state,
        loading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currCity: {},
      };
    case "rejected":
      return { ...state, loading: false, error: action.payload };
    // setCities((cities) => cities.filter((city) => city.id !== id));

    default:
      throw new Error("UnkownAction commited");
  }
}
// eslint-disable-next-line react/prop-types
function CitiesProvider({ children }) {
  const URL = "http://localhost:9000";
  const INITIAL_STATE = { cities: [], loading: false, currCity: {} };
  const [{ cities, error, loading, currCity }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE
  );
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "cities/loading" });
      try {
        const res = await fetch(`${URL}/cities`);
        if (!res.ok) throw new Error("Failed to fetch cities");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: "Could not receive cities" });
      }
    }
    fetchCities();
  }, []);

  async function GetCity(id) {
    try {
      dispatch({ type: "city/loading" });
      const res = await fetch(`${URL}/cities/${id}`);
      if (!res.ok) throw new Error("Failed to fetch cities");
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: "Could not get cities" });
    }
  }

  async function CreateCity(newCity) {
    try {
      dispatch({ type: "createCity/loading" });
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to fetch cities");
      const data = await res.json();
      dispatch({ type: "createCity/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: "Could not create City" });
    }
  }
  async function DeleteCity(id) {
    try {
      dispatch({ type: "createDelete/loading" });
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "createDelete/loaded", payload: id });
    } catch (error) {
      console.error("Caught a problem: " + error);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        GetCity,
        currCity,
        CreateCity,
        DeleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// Custom hook to use the context
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("This hook was used in an incorrect seeting");
  return context;
}

export { CitiesProvider, useCities };
