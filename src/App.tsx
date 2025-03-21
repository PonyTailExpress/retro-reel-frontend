import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import AboutPage from "./pages/AboutPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import EightiesMovieList from "./pages/EightiesMovieList";

function App() {
  return (
    <MantineProvider>
      <Router>
        <Navbar />
        <div style={{ paddingTop: "60px" }}> {/* Offset for fixed navbar */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/80smovies" element={<EightiesMovieList />} />
          </Routes>
        </div>
      </Router>
    </MantineProvider>
  );
}

export default App;
