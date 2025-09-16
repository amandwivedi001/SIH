import React, { useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "./ui/Button";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isTrackingPage = location.pathname === "/tracking";

  const navItems = [
    { to: "/features", label: "Features" },
    { to: "/languages", label: "Languages" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-slate-900/80 backdrop-blur-lg border-b border-blue-500/20 sticky top-0 z-50 shadow-lg shadow-blue-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center shadow-md shadow-blue-700/40">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">
              TrackSecure
            </span>
          </div>

          {/* Center: Nav */}
          {!isTrackingPage && (
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive
                        ? "text-emerald-400"
                        : "text-slate-300 hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          )}

          {/* Right: Buttons */}
          {!isTrackingPage && (
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-slate-200 hover:text-white hover:bg-slate-800/40"
              >
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:opacity-90 text-white shadow-md shadow-blue-900/40">
                Get Started
              </Button>
            </div>
          )}

          {/* Mobile Toggle */}
          {!isTrackingPage && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-blue-900/40 transition"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
        </div>

        {/* Mobile Nav */}
        {!isTrackingPage && isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-blue-500/20 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="text-slate-300 hover:text-white transition py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="flex flex-col space-y-3 pt-4">
              <Button className="bg-slate-800 text-white hover:bg-slate-700">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:opacity-90">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
