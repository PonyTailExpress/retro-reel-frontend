import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Card, Image, Text, Loader, Alert } from "@mantine/core";

const API_URL = import.meta.env.VITE_OMDB_API_URL;
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

const NinetiesMovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Function to fetch movies year by year (1990-1999)
  const fetchMovies = async () => {
    setLoading(true);
    setError(""); // Reset error before fetching
    let allMovies: Movie[] = [];

    try {
      for (let year = 1990; year <= 1999; year++) {
        const response = await axios.get(API_URL, {
          params: {
            s: "movie",
            y: year,
            type: "movie",
            apikey: API_KEY,
          },
        });

        if (response.data.Response === "True") {
          allMovies = [...allMovies, ...response.data.Search];
        }
      }

      if (allMovies.length === 0) {
        setError("No movies found from the 90s.");
      } else {
        setMovies(allMovies);
      }
    } catch (err) {
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
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
          <Grid.Col key={movie.imdbID} span={4}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
                  alt={movie.Title}
                  height={300}
                />
              </Card.Section>
              <Text ta="center" fw={600} mt="sm">
                {movie.Title} ({movie.Year})
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default NinetiesMovieList;
