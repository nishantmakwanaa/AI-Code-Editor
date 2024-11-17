import React, { useState } from 'react';

// Define the articles array
const articles = [
    { 
      title: 'Introduction to React',
      summary: 'React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”.',
      link: 'https://reactjs.org/docs/getting-started.html',
    },
    { 
      title: 'Python Basics',
      summary: 'Python is an interpreted, high-level and general-purpose programming language. Python\'s design philosophy emphasizes code readability with its notable use of significant indentation.',
      link: 'https://www.learnpython.org/',
    },
    { 
      title: 'Java Programming Language',
      summary: 'Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.',
      link: 'https://docs.oracle.com/en/java/',
    },
    { 
      title: 'Node.js Fundamentals',
      summary: 'Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a web browser.',
      link: 'https://nodejs.org/en/docs/',
    },
    { 
      title: 'CSS Flexbox Guide',
      summary: 'Flexbox is a one-dimensional layout method for laying out items in rows or columns. Items flex to fill additional space and shrink to fit into smaller spaces.',
      link: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
    },
    { 
      title: 'SQL Basics',
      summary: 'SQL (Structured Query Language) is a domain-specific language used in programming and designed for managing data held in a relational database management system, or for stream processing in a relational data stream management system.',
      link: 'https://www.w3schools.com/sql/',
    },
    { 
      title: 'Git Version Control',
      summary: 'Git is a distributed version control system for tracking changes in source code during software development. It is designed for coordinating work among programmers, but it can be used to track changes in any set of files.',
      link: 'https://git-scm.com/doc',
    },
  // Add more articles as needed
];

function Notes() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleExpanded = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Filter articles based on search term
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="notes" style={{ background: 'linear-gradient(to bottom right, #4F44E0, #32B67A)', width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '50px' }}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '10px', marginBottom: '20px', width: '80%', maxWidth: '600px', border: 'none', borderRadius: '8px', fontSize: '16px' }}
      />
      <div className="articles" style={{ maxWidth: '800px', width: '100%' }}>
        {filteredArticles.map((article, index) => (
          <div
            key={index}
            className={`article-card ${expandedIndex === index ? 'expanded' : ''}`}
            onClick={() => toggleExpanded(index)}
            style={{ maxWidth: '100%' }}
          >
            <h2>{article.title}</h2>
            <p>{article.summary}</p>
            <a href={article.link} target="_blank" rel="noopener noreferrer">Read More...</a>
            {/* Blur effect */}
            <div className="blur-effect"></div>
          </div>
        ))}
      </div>

      {/* Internal CSS */}
      <style>
        {`
          /* Article card styles */
          .article-card {
            position: relative;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin: 20px auto;
            padding: 20px;
            width: 100%;
            cursor: pointer;
            transition: max-height 0.3s ease;
          }

          .article-card h2 {
            color: #333;
            font-size: 20px;
            margin-bottom: 10px;
          }

          .article-card p {
            color: #666;
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 10px;
          }

          .article-card a {
            color: #007bff;
            display: inline-block;
            text-decoration: none;
            font-weight: bold;
            transition: color 0.3s ease;
          }

          .article-card a:hover {
            color: #0056b3;
          }

          /* Blur effect */
          .blur-effect {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(10px);
            z-index: -1;
            border-radius: 8px;
            transition: backdrop-filter 0.3s ease;
          }

          /* Expand/collapse effect */
          .article-card.expanded {
            max-height: none;
          }
        `}
      </style>
    </div>
  );
}

export default Notes;
