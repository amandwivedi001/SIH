// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastProvider } from "./Components/ui/ToastProvider";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import LoginPage from "./Components/LoginPage";
import TrackingPage from "./Components/tracking/TrackingPage";

function App() {
  return (
    <ToastProvider>
      <Header />
      <main className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
        </Routes>
      </main>
      <Footer />
    </ToastProvider>
  );
}

export default App;
