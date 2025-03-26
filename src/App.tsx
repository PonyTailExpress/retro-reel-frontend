import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import AboutPage from "./pages/AboutPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import EightiesMovieList from "./pages/EightiesMovieList";
import NinetiesMovieList from "./pages/NinetiesMovieList";
import ForgotPassword from "./pages/ForgotPassword";
import ProfilePage from "./pages/ProfilePage";
import MovieDetail from "./pages/MovieDetail";
import Footer from "./components/footer";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <MantineProvider>
      <Notifications
        position="top-right"
        autoClose={3000}
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />
      <Router>
        <Navbar />
        <div
          style={{
            paddingTop: "60px",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/films/80s" element={<EightiesMovieList />} />
            <Route path="/films/90s" element={<NinetiesMovieList />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/profilepage" element={<ProfilePage />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </MantineProvider>
  );
}

export default App;
