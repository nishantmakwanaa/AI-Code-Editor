import React, { useState } from "react";

const articles = [
  {
    title: "Introduction to React",
    summary:
      "React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”.",
    link: "https://reactjs.org/docs/getting-started.html",
  },
  {
    title: "Python Basics",
    summary:
      "Python is an interpreted, high-level and general-purpose programming language. Python's design philosophy emphasizes code readability with its notable use of significant indentation.",
    link: "https://www.learnpython.org/",
  },
  {
    title: "Java Programming Language",
    summary:
      "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.",
    link: "https://docs.oracle.com/en/java/",
  },
  {
    title: "Node.js Fundamentals",
    summary:
      "Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a web browser.",
    link: "https://nodejs.org/en/docs/",
  },
  {
    title: "CSS Flexbox Guide",
    summary:
      "Flexbox is a one-dimensional layout method for laying out items in rows or columns. Items flex to fill additional space and shrink to fit into smaller spaces.",
    link: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
  },
  {
    title: "SQL Basics",
    summary:
      "SQL (Structured Query Language) is a domain-specific language used in programming and designed for managing data held in a relational database management system, or for stream processing in a relational data stream management system.",
    link: "https://www.w3schools.com/sql/",
  },
  {
    title: "Git Version Control",
    summary:
      "Git is a distributed version control system for tracking changes in source code during software development. It is designed for coordinating work among programmers, but it can be used to track changes in any set of files.",
    link: "https://git-scm.com/doc",
  },
];

function Notes() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleExpanded = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-600 to-green-500 text-gray-800 p-6">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full max-w-lg p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="w-full max-w-3xl">
        {filteredArticles.map((article, index) => (
          <div
            key={index}
            className={`bg-white shadow-lg rounded-lg p-6 mb-6 transform transition ${
              expandedIndex === index ? "scale-105" : ""
            }`}
            onClick={() => toggleExpanded(index)}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              {article.title}
            </h2>
            <p
              className={`text-gray-600 transition ${
                expandedIndex === index ? "block" : "line-clamp-2"
              }`}
            >
              {article.summary}
            </p>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 font-semibold hover:underline mt-3 inline-block"
            >
              Read More...
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;