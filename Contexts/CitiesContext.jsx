import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const API = "https://backend-production-c718.up.railway.app/api/cities";

const INITIAL_STATE = {
  cities: [],
  currCity: {},
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "cities/loading":
      return { ...state, loading: true, error: null };

    case "cities/loaded":
      return { ...state, loading: false, cities: action.payload };

    case "city/loading":
      return { ...state, loading: true };

    case "city/loaded":
      return { ...state, loading: false, currCity: action.payload };

    case "city/created":
      return {
        ...state,
        loading: false,
        currCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        loading: false,
        cities: state.cities.filter((c) => c.id !== action.payload),
        currCity: {},
      };

    case "rejected":
      return { ...state, loading: false, error: action.payload };

    default:
      throw new Error("Unknown action");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, currCity, loading, error }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE
  );

  /* ======================
     LOAD ALL CITIES
  ====================== */
  async function loadCities() {
    dispatch({ type: "cities/loading" });
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Failed to load cities");
      const data = await res.json();
      dispatch({ type: "cities/loaded", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  useEffect(() => {
    loadCities();
  }, []);

  /* ======================
     GET ONE CITY
  ====================== */
  async function GetCity(id) {
    dispatch({ type: "city/loading" });
    try {
      const res = await fetch(`${API}/${id}`);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  /* ======================
     CREATE CITY (SELF RELOAD)
  ====================== */
  async function CreateCity(newCity) {
    dispatch({ type: "cities/loading" });

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cityName: newCity.cityName,
          lat: newCity.position.lat,
          lng: newCity.position.lng,
          date: newCity.date,
          notes: newCity.notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create city");

      dispatch({ type: "city/created", payload: data });

      // 🔁 SELF RELOAD (no page refresh)
      await loadCities();

    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  /* ======================
     DELETE CITY
  ====================== */
  async function DeleteCity(id) {
    dispatch({ type: "cities/loading" });
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete city");
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currCity,
        loading,
        error,
        GetCity,
        CreateCity,
        DeleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error("useCities must be used inside CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
