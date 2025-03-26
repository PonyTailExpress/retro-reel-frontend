// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import {
//   Container,
//   Grid,
//   Card,
//   Image,
//   Text,
//   Loader,
//   Alert,
//   Button,
// } from "@mantine/core";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/auth.context";

// const API_URL = import.meta.env.VITE_API_URL + "/movies";

// interface Movie {
//   id: number;
//   imdbId: string;
//   title: string;
//   releaseYear: number;
//   poster: string;
// }

// const EightiesMovieList: React.FC = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");
//   const { isLoggedIn, user } = useContext(AuthContext); // Access AuthContext

//   // Fetch movies from your backend API
//   const fetchMovies = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(API_URL);

//       if (response.status === 200) {
//         // Filter only movies from the 80s (1980 - 1989)
//         const eightiesMovies = response.data.filter(
//           (movie: Movie) =>
//             movie.releaseYear >= 1980 && movie.releaseYear < 1990
//         );
//         setMovies(eightiesMovies);
//       } else {
//         setError("Failed to fetch movies.");
//       }
//     } catch (err) {
//       setError("Failed to fetch movies.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddToFavorites = async (movieId: number) => {
//     if (!isLoggedIn || !user) {
//       alert("Please log in to add movies to your favorites.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/favorites/add`,
//         { userId: user.id, movieId },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//         }
//       );

//       if (response.status === 201) {
//         alert("Movie added to your favorites!");
//       }
//     } catch (error) {
//       alert("Failed to add movie to favorites.");
//     }
//   };

//   useEffect(() => {
//     fetchMovies(); // Fetch movies from the backend
//   }, []);

//   return (
//     <Container>
//       <Text size="xl" fw={700} ta="center" my="md">
//         Classic Movies of the 80s
//       </Text>

//       {loading && <Loader size="xl" />}
//       {error && <Alert color="red">{error}</Alert>}

//       <Grid>
//         {movies.map((movie) => (
//           <Grid.Col key={movie.imdbId} span={4}>
//             <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
//               <Card
//                 shadow="sm"
//                 p="lg"
//                 radius="md"
//                 withBorder
//                 style={{
//                   height: 450,
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 <Card.Section
//                   style={{
//                     flex: 1, // This makes the image section grow to fill available space
//                     overflow: "hidden",
//                   }}
//                 >
//                   <Image
//                     src={
//                       movie.poster !== "N/A" ? movie.poster : "/placeholder.jpg"
//                     }
//                     alt="Movie Poster"
//                     style={{
//                       objectFit: "cover", // Ensures the image fills the section without distortion
//                       width: "100%",
//                       height: "100%",
//                       borderRadius: "md",
//                     }}
//                   />
//                 </Card.Section>
//                 <Text ta="center" fw={600} mt="sm">
//                   {movie.title}
//                 </Text>

//                 {/* Add to Favorites Button */}
//                 {isLoggedIn && (
//                   <Button
//                     mt="md"
//                     fullWidth
//                     onClick={() => handleAddToFavorites(movie.id)}
//                   >
//                     Add to Favorites
//                   </Button>
//                 )}
//               </Card>
//             </Link>
//           </Grid.Col>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default EightiesMovieList;

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  Image,
  Text,
  Loader,
  Alert,
  Button,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Notifications } from "@mantine/notifications";

const API_URL = import.meta.env.VITE_API_URL + "/movies";

interface Movie {
  id: number;
  imdbId: string;
  title: string;
  releaseYear: number;
  poster: string;
}

const EightiesMovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { isLoggedIn, user } = useContext(AuthContext); // Access AuthContext
  const navigate = useNavigate(); // Hook for navigation

  // Fetch movies from your backend API
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);

      if (response.status === 200) {
        // Filter only movies from the 80s (1980 - 1989)
        const eightiesMovies = response.data.filter(
          (movie: Movie) =>
            movie.releaseYear >= 1980 && movie.releaseYear < 1990
        );
        setMovies(eightiesMovies);
      } else {
        setError("Failed to fetch movies.");
      }
    } catch (err) {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavorites = async (movieId: number) => {
    if (!isLoggedIn || !user) {
      Notifications.show({
        title: "Login Required",
        message: "Please log in to add movies to your favorites.",
        color: "red",
        position: "top-right", // Set position to top-right
        autoClose: 3000, // Close after 3 seconds
      });
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/favorites/add`,
        { userId: user.id, movieId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 201) {
        Notifications.show({
          title: "Success",
          message: "Movie added to your favorites!",
          color: "teal",
          // position: "top-right", // Set position to top-right
          // autoClose: 3000, // Close after 3 seconds
        });

        // Redirect to the favorites page
        navigate("/favorites");
      }
    } catch (error) {
      Notifications.show({
        title: "Error",
        message: "Failed to add movie to favorites.",
        color: "red",
        // position: "top-right", // Set position to top-right
        // autoClose: 3000, // Close after 3 seconds
      });
    }
  };

  useEffect(() => {
    fetchMovies(); // Fetch movies from the backend
  }, []);

  return (
    <Container>
      <Text size="xl" fw={700} ta="center" my="md">
        Classic Movies of the 80s
      </Text>

      {loading && <Loader size="xl" />}
      {error && <Alert color="red">{error}</Alert>}

      <Grid>
        {movies.map((movie) => (
          <Grid.Col key={movie.imdbId} span={4}>
            <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
              <Card
                shadow="sm"
                p="lg"
                radius="md"
                withBorder
                style={{
                  height: 450,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Card.Section
                  style={{
                    flex: 1, // This makes the image section grow to fill available space
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={
                      movie.poster !== "N/A" ? movie.poster : "/placeholder.jpg"
                    }
                    alt="Movie Poster"
                    style={{
                      objectFit: "cover", // Ensures the image fills the section without distortion
                      width: "100%",
                      height: "100%",
                      borderRadius: "md",
                    }}
                  />
                </Card.Section>
                <Text ta="center" fw={600} mt="sm">
                  {movie.title}
                </Text>

                {/* Add to Favorites Button */}
                {isLoggedIn && (
                  <Button
                    mt="md"
                    fullWidth
                    onClick={() => handleAddToFavorites(movie.id)}
                  >
                    Add to Favorites
                  </Button>
                )}
              </Card>
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default EightiesMovieList;
