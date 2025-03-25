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

const API_URL = import.meta.env.VITE_API_URL + "/movies";

// Define the movie interface based on your backend response
interface Movie {
  id: number;
  imdbId: string;
  title: string;
  releaseYear: number;
  poster: string;
}

const NinetiesMovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Function to fetch movies from the backend
  const fetchMovies = async () => {
    setLoading(true);
    setError(""); // Reset error before fetching

    try {
      const response = await axios.get(API_URL); // Replace with your backend API endpoint
      const allMovies = response.data;

      // Filter movies from the 1990s
      const ninetiesMovies = allMovies.filter(
        (movie: Movie) => movie.releaseYear >= 1990 && movie.releaseYear < 2000
      );

      if (ninetiesMovies.length === 0) {
        setError("No movies found from the 90s.");
      } else {
        setMovies(ninetiesMovies);
      }
    } catch (err) {
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(); // Fetch the movies when the component mounts
  }, []);

  return (
    <Container>
      <Text size="xl" fw={700} ta="center" my="md">
        Classic Movies of the 90s
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
                    width: "100%",
                    height: "100%",
                    borderRadius: "md",
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

export default NinetiesMovieList;
