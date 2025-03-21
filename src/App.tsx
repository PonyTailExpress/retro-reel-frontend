import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

// const App: React.FC = () => {
//   // Authentication state
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState<{ name: string } | null>(null);

//   const logOutUser = () => {
//     setIsLoggedIn(false);
//     setUser(null);
//   };



function App() {
  return (
    <MantineProvider>
      <Router>
        <Navbar />
        <div style={{ paddingTop: "60px" }}> {/* Offset for fixed navbar */}
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/about" element={<div>About Page</div>} />
            <Route path="/signup" element={<div>Sign Up Page</div>} />
            <Route path="/login" element={<div>Sign In Page</div>} />
          </Routes>
        </div>
      </Router>
    </MantineProvider>
  );
}

export default App;