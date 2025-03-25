// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Container,
//   Grid,
//   Card,
//   Image,
//   Text,
//   Loader,
//   Alert,
// } from "@mantine/core";

// const API_URL = import.meta.env.VITE_API_URL + "/movies"; // Using the environment variable

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
//             <Card
//               shadow="sm"
//               p="lg"
//               radius="md"
//               withBorder
//               style={{ minHeight: 400 }} // Increased the minHeight to accommodate longer cards
//             >
//               <Card.Section>
//                 <Image
//                   src={
//                     movie.poster !== "N/A" ? movie.poster : "/placeholder.jpg"
//                   }
//                   alt="Movie Poster"
//                   height={300} // Set a fixed height for the poster
//                   style={{
//                     objectFit: "cover",
//                     width: "100%",
//                     borderRadius: "md", // Rounded corners for image
//                   }}
//                 />
//               </Card.Section>
//               <Text ta="center" fw={600} mt="sm">
//                 {movie.title}
//               </Text>
//             </Card>
//           </Grid.Col>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default EightiesMovieList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  Image,
  Text,
  Loader,
  Alert,
} from "@mantine/core";

const API_URL = import.meta.env.VITE_API_URL + "/movies"; // Using the environment variable

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
            <Card
              shadow="sm"
              p="lg"
              radius="md"
              withBorder
              style={{
                height: 450, // Set a fixed height for all cards
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Card.Section
                style={{
                  flex: 1, // This makes the image section grow to fill available space
                  overflow: "hidden", // Ensures that no part of the image overflows
                }}
              >
                <Image
                  src={
                    movie.poster !== "N/A" ? movie.poster : "/placeholder.jpg"
                  }
                  alt="Movie Poster"
                  style={{
                    objectFit: "cover", // Ensures the image fills the section without distortion
                    width: "100%", // Fill the width of the section
                    height: "100%", // Ensure the image stretches to fill the height
                    borderRadius: "md", // Rounded corners for the image
                  }}
                />
              </Card.Section>
              <Text ta="center" fw={600} mt="sm">
                {movie.title}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default EightiesMovieList;
