import React, { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/code-editor", label: "Workspace" },
    { path: "/youtube-learning", label: "Learn" },
    { path: "/notes", label: "Notes" },
  ];

  return (
    <nav className="flex items-center justify-between bg-gray-900 p-4 text-white h-16 shadow-lg relative">
      <RouterLink
        to="/"
        className="text-xl font-bold hover:text-cyan-400 transition-colors"
        onClick={closeMenu}
      >
        CodeCraft
      </RouterLink>

      <div className="hidden md:flex space-x-4">
        {navLinks.map(({ path, label }, index) => (
          <RouterLink
            key={index}
            to={path}
            className={`${
              location.pathname === path ? "text-cyan-400" : "text-white"
            } hover:text-gray-400 transition-colors`}
          >
            {label}
          </RouterLink>
        ))}
      </div>

      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 p-4 space-y-4 z-50">
          {navLinks.map(({ path, label }, index) => (
            <RouterLink
              key={index}
              to={path}
              className={`${
                location.pathname === path ? "text-cyan-400" : "text-white"
              } hover:text-gray-400 transition-colors block`}
              onClick={closeMenu}
            >
              {label}
            </RouterLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;