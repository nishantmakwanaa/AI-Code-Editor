import React, { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between bg-gray-900 p-4 text-white h-16 shadow-lg relative">
      <RouterLink
        to="/"
        className="text-xl font-bold hover:text-cyan-400 transition-colors"
      >
        CodeCraft
      </RouterLink>

      <div className="hidden md:flex space-x-4">
        <RouterLink
          to="/"
          className={`${
            location.pathname === "/" ? "text-cyan-400" : "text-white"
          } hover:text-gray-400 transition-colors`}
        >
          Home
        </RouterLink>
        <RouterLink
          to="/code-editor"
          className={`${
            location.pathname === "/code-editor"
              ? "text-cyan-400"
              : "text-white"
          } hover:text-gray-400 transition-colors`}
        >
          Workspace
        </RouterLink>
        <RouterLink
          to="/youtube-learning"
          className={`${
            location.pathname === "/youtube-learning"
              ? "text-cyan-400"
              : "text-white"
          } hover:text-gray-400 transition-colors`}
        >
          Learn
        </RouterLink>
        <RouterLink
          to="/notes"
          className={`${
            location.pathname === "/notes" ? "text-cyan-400" : "text-white"
          } hover:text-gray-400 transition-colors`}
        >
          Notes
        </RouterLink>
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
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
          <RouterLink
            to="/"
            className={`${
              location.pathname === "/" ? "text-cyan-400" : "text-white"
            } hover:text-gray-400 transition-colors block`}
          >
            Home
          </RouterLink>
          <RouterLink
            to="/code-editor"
            className={`${
              location.pathname === "/code-editor"
                ? "text-cyan-400"
                : "text-white"
            } hover:text-gray-400 transition-colors block`}
          >
            Workspace
          </RouterLink>
          <RouterLink
            to="/youtube-learning"
            className={`${
              location.pathname === "/youtube-learning"
                ? "text-cyan-400"
                : "text-white"
            } hover:text-gray-400 transition-colors block`}
          >
            Learn
          </RouterLink>
          <RouterLink
            to="/notes"
            className={`${
              location.pathname === "/notes" ? "text-cyan-400" : "text-white"
            } hover:text-gray-400 transition-colors block`}
          >
            Notes
          </RouterLink>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
