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

const API_URL = import.meta.env.VITE_API_URL + "/movies";

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
  const { id } = useParams<{ id: string }>();
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
          style={{ minHeight: 500 }}
        >
          <Card.Section
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 300,
              overflow: "hidden",
            }}
          >
            <Image
              src={movie.poster !== "N/A" ? movie.poster : "/placeholder.jpg"}
              alt={movie.title}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
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
