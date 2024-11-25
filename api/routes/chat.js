const express = require("express");
const router = express.Router();

const qaPairs = {
  "What is JavaScript?":
    "JavaScript is a programming language used for web development.",
  "What is React?":
    "React is a JavaScript library for building user interfaces.",
  "What is Node.js?":
    "Node.js is a runtime environment that allows you to run JavaScript on the server.",
  "What is a function in JavaScript?":
    "A function is a block of code that performs a specific task.",
  "What is the difference between var, let, and const?":
    "var is function-scoped, let and const are block-scoped. const is read-only, while let can be reassigned.",
  "What is an array in JavaScript?":
    "An array is a data structure used to store multiple values in a single variable.",
  "What is the difference between == and === in JavaScript?":
    "== checks for equality of values, while === checks for equality of both value and type.",
  "What is the DOM?":
    "The DOM (Document Object Model) is an interface that allows JavaScript to manipulate HTML and XML documents.",
  "What is an object in JavaScript?":
    "An object is a collection of properties, each with a key and a value.",
  "What is a closure in JavaScript?":
    "A closure is a function that retains access to its lexical scope even when the function is executed outside that scope.",
  "What is event delegation in JavaScript?":
    "Event delegation is the technique of using a single event listener to handle events for multiple elements.",
  "What is the purpose of 'this' keyword in JavaScript?":
    "'this' refers to the context in which a function is called and provides access to the object the function is part of.",
  "What is a promise in JavaScript?":
    "A promise is an object representing the eventual completion or failure of an asynchronous operation.",
  "What is an async function in JavaScript?":
    "An async function is a function that always returns a promise, and can be used with 'await' to handle asynchronous operations.",
  "What is the difference between synchronous and asynchronous code?":
    "Synchronous code runs line by line, while asynchronous code allows operations to run independently without blocking the execution.",
  "What is a callback function?":
    "A callback function is a function that is passed as an argument to another function and executed after a specific task is completed.",
  "What is a higher-order function in JavaScript?":
    "A higher-order function is a function that takes one or more functions as arguments or returns a function as a result.",
  "What is recursion?":
    "Recursion is a process where a function calls itself in order to solve a problem.",
  "What is a prototype in JavaScript?":
    "A prototype is an object that provides shared properties and methods for other objects in JavaScript.",
  "What is an IIFE (Immediately Invoked Function Expression)?":
    "An IIFE is a function that is declared and immediately invoked.",
  "What is destructuring in JavaScript?":
    "Destructuring is a syntax that allows unpacking values from arrays or objects into distinct variables.",
  "What is the spread operator?":
    "The spread operator (...) is used to unpack elements from an array or object.",
  "What is the rest operator?":
    "The rest operator (...) collects the remaining elements of an array or object into a new array or object.",
  "What is an arrow function in JavaScript?":
    "An arrow function is a concise way to write functions using the syntax (parameter) => expression.",
  "What is an event listener?":
    "An event listener is a function that waits for a specific event (e.g., click, input) to occur and then executes code when that event is triggered.",
  "What is the difference between null and undefined?":
    "null is an intentional absence of value, while undefined means a variable has been declared but not assigned a value.",
  "What is a map in JavaScript?":
    "A map is a collection of key-value pairs where keys can be any data type and values can be any valid JavaScript value.",
  "What is the difference between map and forEach?":
    "map creates a new array based on the results of the function, while forEach does not create a new array but simply executes the function for each element.",
  "What is the purpose of 'bind' method in JavaScript?":
    "'bind' is used to create a new function that, when called, has its 'this' keyword set to the provided value.",
  "What is a set in JavaScript?":
    "A set is a collection of unique values in JavaScript, where each value can only occur once.",
  "What is the event loop in JavaScript?":
    "The event loop is a mechanism that allows JavaScript to handle asynchronous code without blocking the execution of other code.",
  "What are template literals in JavaScript?":
    "Template literals allow you to embed expressions inside strings using backticks and `${expression}` syntax.",
  "What is a static method in JavaScript?":
    "A static method is a method that belongs to a class itself, not to instances of the class.",
  "What is a default parameter in JavaScript?":
    "A default parameter is a parameter that has a default value if no argument is provided when calling the function.",
  "What is a generator function in JavaScript?":
    "A generator function is a function that can pause execution and later resume where it left off, using 'yield'.",
  "What is a setTimeout function in JavaScript?":
    "setTimeout is a function that executes a piece of code after a specified delay (in milliseconds).",
  "What is a setInterval function in JavaScript?":
    "setInterval is a function that repeatedly executes a piece of code at a specified interval (in milliseconds).",
  "What is a global object in JavaScript?":
    "The global object provides a way to access global variables and functions from anywhere in JavaScript, like window in the browser or global in Node.js.",
  "What is a module in JavaScript?":
    "A module is a file containing reusable code that can be imported into other files using import/export syntax.",
  "What is the 'new' keyword in JavaScript?":
    "The 'new' keyword is used to create an instance of a class or constructor function.",
  "What is a singleton pattern?":
    "The singleton pattern is a design pattern where only one instance of a class is allowed to exist.",
  "What is the MVC pattern?":
    "The MVC (Model-View-Controller) pattern is a software design pattern for separating concerns in an application into three interconnected components.",
  "What is a promise chain in JavaScript?":
    "A promise chain allows multiple asynchronous operations to be performed in sequence, where each step depends on the previous one.",
  "What is a state in React?":
    "State in React is an object that determines the behavior and rendering of a component.",
  "What is the useEffect hook in React?":
    "useEffect is a hook in React that allows you to perform side effects like data fetching, subscriptions, and DOM manipulations.",
  "What is JSX in React?":
    "JSX is a syntax extension for JavaScript that allows you to write HTML-like code inside JavaScript.",
  "What are props in React?":
    "Props (short for properties) are used to pass data from a parent component to a child component in React.",
  "What is virtual DOM in React?":
    "The virtual DOM is a lightweight copy of the real DOM used to optimize rendering performance in React.",
  "What is the difference between state and props in React?":
    "State is local to a component and can change over time, while props are passed from parent to child components and are immutable.",
  "What is a React hook?":
    "A React hook is a special function that allows you to hook into React features like state and lifecycle methods in functional components.",
  "What is the useState hook in React?":
    "useState is a hook that allows you to add state to functional components in React.",
  "What is the context API in React?":
    "The context API is a feature in React that allows you to share values like state between components without passing props manually.",
  "What is the difference between class components and functional components in React?":
    "Class components are ES6 classes with lifecycle methods, while functional components are simple functions that can be enhanced with hooks.",
  "What is the purpose of the key prop in React?":
    "The key prop is used to uniquely identify elements in a list to help React efficiently update the DOM.",
  "What is component lifecycle in React?":
    "The component lifecycle refers to the sequence of methods that are called at different stages of a component's existence in React, such as mounting, updating, and unmounting.",
  "What is Redux?":
    "Redux is a state management library used to manage the state of an application in a predictable way.",
  "What is the difference between Redux and React Context?":
    "Redux is a more powerful and flexible state management library, while React Context is useful for passing data down through the component tree but isn't as powerful as Redux.",
  "What is the difference between React Router and Next.js?":
    "React Router is a library for handling routing in React applications, while Next.js is a full React framework that includes server-side rendering and routing.",
  "What are higher-order components in React?":
    "A higher-order component (HOC) is a function that takes a component and returns a new component with enhanced functionality.",
  "What are fragments in React?":
    "Fragments are used to group multiple elements without adding extra nodes to the DOM.",
  "What is the purpose of useReducer hook in React?":
    "useReducer is a hook that is used for managing more complex state logic in React components, especially when the state depends on previous states.",
  "What is a controlled component in React?":
    "A controlled component is an input element whose value is controlled by the state of the React component.",
  "What is an uncontrolled component in React?":
    "An uncontrolled component is an input element where the value is handled by the DOM rather than the React state.",
  "What is error boundary in React?":
    "An error boundary is a React component that catches JavaScript errors anywhere in their child component tree, logs those errors, and displays a fallback UI.",
  "What is lazy loading in React?":
    "Lazy loading is a technique in React where components are loaded only when they are needed to improve performance.",
  "What is server-side rendering (SSR) in React?":
    "Server-side rendering is the process of rendering a React application on the server before sending it to the client, improving SEO and load time.",
  "What is static site generation (SSG) in React?":
    "Static site generation is a method where pages are pre-rendered at build time, offering faster page loads and better SEO.",
  "What is API in React?":
    "An API (Application Programming Interface) in React is a way for components to interact with external data or services, typically using fetch or axios.",
  "What is the useLayoutEffect hook in React?":
    "useLayoutEffect is a hook that works like useEffect, but it runs synchronously after all DOM mutations, useful for reading layout properties.",
  "What is the difference between useEffect and useLayoutEffect?":
    "useEffect runs after the render, while useLayoutEffect runs synchronously after the render but before the DOM is painted.",
  "What is a Progressive Web App (PWA)?":
    "A PWA is a type of application software built using standard web technologies, offering offline capabilities and a native app-like experience.",
  "What is CORS?":
    "CORS (Cross-Origin Resource Sharing) is a security feature that restricts how resources on a web server can be requested from another domain.",
  "What is a database in programming?":
    "A database is an organized collection of data, typically stored and accessed electronically from a computer system.",
  "What is SQL?":
    "SQL (Structured Query Language) is a standard language used for managing and manipulating databases.",
  "What is NoSQL?":
    "NoSQL is a type of database that provides a mechanism for storing and retrieving data that is modeled differently than the tabular relations used in relational databases.",
  "What is MongoDB?":
    "MongoDB is a NoSQL database that stores data in JSON-like documents, making it flexible and scalable.",
  "What is an index in a database?":
    "An index is a data structure that improves the speed of data retrieval operations on a database table.",
  "What is normalization in databases?":
    "Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity.",
  "What is an entity in database design?":
    "An entity represents a real-world object or concept in a database, such as a customer or an order.",
  "What is an SQL join?":
    "An SQL join is used to combine rows from two or more tables based on a related column between them.",
  "What is a primary key?":
    "A primary key is a unique identifier for a record in a database table.",
  "What is a foreign key?":
    "A foreign key is a column or group of columns in a table that links to the primary key of another table.",
  "What is a transaction in a database?":
    "A transaction is a sequence of database operations that are treated as a single unit of work.",
  "What is a stored procedure?":
    "A stored procedure is a precompiled collection of one or more SQL statements that can be executed as a single unit.",
  "What is a trigger in a database?":
    "A trigger is a set of SQL statements that automatically execute when a specific event occurs in the database.",
};

router.post("/", (req, res) => {
  const { question } = req.body;
  const answer = qaPairs[question] || "Sorry, I Don't Know The Answer To That.";
  res.json({ question, answer });
});

module.exports = router;
