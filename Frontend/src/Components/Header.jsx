import React, { useState } from "react";
import { Menu, X, LucideBusFront } from "lucide-react";
import { Button } from "./ui/Button";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isTrackingPage = location.pathname === "/tracking";
  const isdes = location.pathname === "/destinationSearch";
  const ismap = location.pathname === "/mapView";

  const navItems = [
    { to: "/features", label: "Features" },
    { to: "/languages", label: "Languages" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    !ismap && (
      <header className="bg-white/90 backdrop-blur-lg border-b border-yellow-300/40 sticky top-0 z-50 shadow-md shadow-yellow-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
<div className="flex items-center space-x-2">
  <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center shadow-md shadow-blue-700/40">
    <LucideBusFront className="w-5 h-5 text-white" />
  </div>
  <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">
    Safar
  </span>
</div>

            {/* Center: Nav */}
            {!isTrackingPage && !isdes && !ismap && (
              <nav className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors ${
                        isActive
                          ? "text-yellow-600"
                          : "text-slate-700 hover:text-yellow-600"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            )}

            {/* Right: Buttons */}
            {!isTrackingPage && !isdes && !ismap && (
              <div className="hidden md:flex items-center space-x-4">
                <Button
                  variant="ghost"
                  className="text-slate-700 hover:text-yellow-700 hover:bg-yellow-100/40"
                >
                  Sign In
                </Button>
                <Button
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white 
                          hover:from-yellow-400 hover:to-yellow-500 
                          shadow-md shadow-yellow-700/30 
                          transition-all duration-300
                          focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                >
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile Toggle */}
            {!isTrackingPage && !isdes && !ismap && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-slate-700 hover:text-yellow-700 hover:bg-yellow-100/40 transition"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}
          </div>

          {/* Mobile Nav */}
          {!isTrackingPage && !isdes && !ismap && isMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t border-yellow-300/40 animate-fade-in">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className="text-slate-700 hover:text-yellow-600 transition py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <div className="flex flex-col space-y-3 pt-4">
                <Button className="text-slate-700 hover:text-yellow-700 hover:bg-yellow-100/40">
                  Sign In
                </Button>
                <Button
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white 
                          hover:from-yellow-400 hover:to-yellow-500 
                          shadow-md shadow-yellow-700/30 
                          transition-all duration-300
                          focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                >
                  Get Started
                </Button>


              </div>
            </div>
          )}
        </div>
      </header>
    )
  );
};

export default Header;
