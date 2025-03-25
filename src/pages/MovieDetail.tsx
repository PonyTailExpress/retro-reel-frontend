// // MovieDetail.tsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { Container, Text, Loader, Alert, Card, Image } from "@mantine/core";

// const MovieDetail: React.FC = () => {
//   const [movie, setMovie] = useState<any>(null); // We'll store movie details here
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   const { id } = useParams();

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`http://localhost:5000/movies/${id}`);

//         if (response.status === 200) {
//           setMovie(response.data); // Store movie data
//         } else {
//           setError("Failed to fetch movie details.");
//         }
//       } catch (err) {
//         setError("Failed to fetch movie details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovieDetails(); // Fetch movie details when the component mounts
//   }, [id]);

//   return (
//     <Container>
//       {loading && <Loader size="xl" />}
//       {error && <Alert color="red">{error}</Alert>}

//       {movie && (
//         <Card shadow="sm" p="lg" radius="md" withBorder>
//           <Card.Section>
//             <Image
//               src={movie.poster}
//               alt={movie.title}
//               style={{
//                 objectFit: "cover",
//                 width: "100%",
//                 height: "300px",
//               }}
//             />
//           </Card.Section>
//           <Text size="xl" fw={700} ta="center" my="md">
//             {movie.title} ({movie.releaseYear})
//           </Text>
//           <Text size="md" ta="center" my="sm">
//             {movie.description}
//           </Text>
//           <Text size="sm" ta="center" color="gray">
//             Directed by: {movie.director}
//           </Text>
//           {movie.rating && (
//             <Text ta="center" mt="sm" size="sm" color="yellow">
//               Rating: {movie.rating}
//             </Text>
//           )}
//         </Card>
//       )}
//     </Container>
//   );
// };

// export default MovieDetail;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  Image,
  Text,
  Loader,
  Alert,
  Button,
} from "@mantine/core";

const API_URL = import.meta.env.VITE_API_URL + "/movies"; // Make sure your API URL is correctly set

interface Movie {
  id: number;
  imdbId: string;
  title: string;
  releaseYear: number;
  poster: string;
  description: string;
  genre: string;
  trailerUrl: string;
  director: string;
}

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the movie ID from the URL params
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch movie details based on ID or imdbId
  const fetchMovieDetails = async () => {
    setLoading(true);
    setError(""); // Reset error before fetching

    try {
      // Fetch the movie details using the ID from the URL
      const response = await axios.get(`${API_URL}/${id}`);

      if (response.status === 200) {
        setMovie(response.data);
      } else {
        setError("Movie not found.");
      }
    } catch (err) {
      setError("Failed to fetch movie details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails(); // Fetch movie details when the component is mounted
  }, [id]);

  if (loading) {
    return <Loader size="xl" />;
  }

  if (error) {
    return <Alert color="red">{error}</Alert>;
  }

  return (
    <Container>
      {movie && (
        <Card
          shadow="sm"
          p="lg"
          radius="md"
          withBorder
          style={{ minHeight: 500 }} // Set a fixed height for the card to be consistent
        >
          <Card.Section
            style={{
              display: "flex",
              justifyContent: "center", // Horizontally center the image
              alignItems: "center", // Vertically center the image
              height: 300, // Fixed height for the image container
              overflow: "hidden", // Ensures image doesn't overflow
            }}
          >
            <Image
              src={movie.poster !== "N/A" ? movie.poster : "/placeholder.jpg"}
              alt={movie.title}
              style={{
                objectFit: "cover", // Ensures image covers area without distortion
                width: "100%", // Image fills the width of the container
                height: "100%", // Image fills the height of the container
              }}
            />
          </Card.Section>

          <Text ta="center" fw={700} size="xl" mt="md">
            {movie.title} ({movie.releaseYear})
          </Text>

          <Text ta="center" size="sm" mt="sm">
            <strong>Genre:</strong> {movie.genre}
          </Text>

          <Text ta="center" size="sm" mt="sm">
            <strong>Director:</strong> {movie.director}
          </Text>

          <Text ta="center" size="sm" mt="sm">
            <strong>Description:</strong> {movie.description}
          </Text>

          {movie.trailerUrl && (
            <Button
              component="a"
              href={movie.trailerUrl}
              target="_blank"
              fullWidth
              mt="md"
              color="blue"
            >
              Watch Trailer
            </Button>
          )}
        </Card>
      )}
    </Container>
  );
};

export default MovieDetail;
