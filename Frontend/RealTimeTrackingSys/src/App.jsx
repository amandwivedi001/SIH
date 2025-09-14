import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastProvider } from "./Components/ui/ToastProvider";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Components/pagess/Login";
// import Home from "./Components/pagess/Home";

function App() {
  return (
    <ToastProvider>
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Login/>
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}

export default App;
