import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import Layout from "./Layout";
import LoginPage from "./Components/LoginPage";
import TrackingPage from "./Components/tracking/TrackingPage";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Contact from "./Components/HeaderCompo/Contact";
import About from "./Components/HeaderCompo/About";
import Features from "./Components/HeaderCompo/Features";
import Languages from "./Components/HeaderCompo/Languages";
import { ToastProvider } from "./Components/ui/ToastProvider";
import MapView from "./Components/tracking/MapView";
import DestinationSearchPage from "./Components/tracking/DestinationSearchPage";
import TripPlannerPage from "./Components/Result/TripPlannerPage";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<LoginPage />}></Route>
      <Route path='tracking' element={<TrackingPage />}></Route>
      <Route path='contact' element={<Contact />}></Route>
      <Route path='about' element={<About />}></Route>
      <Route path='feature' element={<Features />}></Route>
      <Route path='verify-otp' element={<LoginPage />}></Route>
      <Route path="mapView" element={<MapView />} />
      <Route path="destinationSearch" element={<DestinationSearchPage />} />
      <Route path="trip-planner" element={<TripPlannerPage />} />
    </Route>
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ToastProvider >
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
    <RouterProvider router={router} />
  </ToastProvider>
);
