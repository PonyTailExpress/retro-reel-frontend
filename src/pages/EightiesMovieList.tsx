import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Card, Image, Text, Loader, Alert } from "@mantine/core";

// Load environment variables
const API_URL = import.meta.env.VITE_OMDB_API_URL;
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

const EightiesMovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch movies from OMDb API
  const fetchMovies = async (searchTerm: string) => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        params: {
          s: searchTerm,
          apikey: API_KEY,
        },
      });

      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setError("No movies found.");
      }
    } catch (err) {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies("80s movies"); // Default search term for 80s movies
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

export default EightiesMovieList;


