import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

import AboutPage from "./pages/AboutPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import EightiesMovieList from "./pages/EightiesMovieList";
import NinetiesMovieList from "./pages/NinetiesMovieList";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <MantineProvider>
      <Router>
        <Navbar />
        <div style={{ paddingTop: "60px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/films/80s" element={<EightiesMovieList />} />
            <Route path="/films/90s" element={<NinetiesMovieList />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Routes>
        </div>
      </Router>
    </MantineProvider>
  );
}

export default App;
