import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "../Pages/Product";
import Pricing from "../Pages/Pricing";
import HomePage from "../Pages/HomePage";
import PageNotFound from "../Pages/PageNotFound";
import AppLayout from "../Pages/AppLayout";
import Login from "../Pages/Login";
import CityList from "../Components/CityList";
import CountryList from "../Components/CountryList";
import City from "../Components/City";
import Form from "../Components/Form";
import { CitiesProvider } from "../Contexts/CitiesContext";
import { AuthProvider } from "../Contexts/FakeAuthContext";
import ProtectedRoute from "../Pages/ProtectedRoute";
import Register from "../Pages/Register";
export default function App() {
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="Product" element={<Product />} />
            <Route path="Pricing" element={<Pricing />} />
            <Route path="*" element={<PageNotFound />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />}></Route>
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />}></Route>
              <Route path="form" element={<Form />}></Route>
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
}