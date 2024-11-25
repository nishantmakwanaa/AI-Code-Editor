import React, { useState } from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  const [iconHovered, setIconHovered] = useState(null);

  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex-1 mb-4 md:mb-0 text-center md:text-left">
          <p className="text-lg font-bold mb-2">Created By Nishant Makwana</p>
          <p>
            CodeCraft Is A Full-Fledged AI-Powered Coding IDE, Designed For
            Programmers.
          </p>
        </div>
        <div className="flex justify-center md:justify-end flex-1 mt-4 md:mt-0">
          <a
            href="https://twitter.com/nishantmakwanaa"
            target="_blank"
            rel="noopener noreferrer"
            className={`mx-2 transition-colors ${
              iconHovered === "twitter" ? "text-gray-400" : "text-white"
            }`}
            onMouseEnter={() => setIconHovered("twitter")}
            onMouseLeave={() => setIconHovered(null)}
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/nishantmakwanaa"
            target="_blank"
            rel="noopener noreferrer"
            className={`mx-2 transition-colors ${
              iconHovered === "linkedin" ? "text-gray-400" : "text-white"
            }`}
            onMouseEnter={() => setIconHovered("linkedin")}
            onMouseLeave={() => setIconHovered(null)}
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/nishantmakwanaa"
            target="_blank"
            rel="noopener noreferrer"
            className={`mx-2 transition-colors ${
              iconHovered === "github" ? "text-gray-400" : "text-white"
            }`}
            onMouseEnter={() => setIconHovered("github")}
            onMouseLeave={() => setIconHovered(null)}
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://youtube.com/@nishantmakwanaa"
            target="_blank"
            rel="noopener noreferrer"
            className={`mx-2 transition-colors ${
              iconHovered === "youtube" ? "text-gray-400" : "text-white"
            }`}
            onMouseEnter={() => setIconHovered("youtube")}
            onMouseLeave={() => setIconHovered(null)}
          >
            <AiFillYoutube size={24} />
          </a>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;