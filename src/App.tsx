import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

const App: React.FC = () => {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  const logOutUser = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      {/* Pass authentication props to Navbar */}
      <Navbar isLoggedIn={isLoggedIn} user={user} logOutUser={logOutUser} />

      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/projects" element={<div>Projects Page</div>} />
        <Route path="/signup" element={<div>Sign Up Page</div>} />
        <Route path="/login" element={<div>Sign In Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;

