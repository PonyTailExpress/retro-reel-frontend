// import React, { useEffect, useState, useContext } from "react";
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
// import { AuthContext } from "../context/auth.context";

// const API_URL = import.meta.env.VITE_API_URL;

// interface Movie {
//   id: number;
//   title: string;
//   poster: string;
// }

// interface Favorite {
//   movie: Movie;
// }

// const Favorites: React.FC = () => {
//   const { user, isLoggedIn } = useContext(AuthContext);
//   const [favorites, setFavorites] = useState<Favorite[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     if (isLoggedIn && user) {
//       axios
//         .get(`${API_URL}/favorites/${user.id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//         })
//         .then((res) => {
//           setFavorites(res.data);
//         })
//         .catch(() => {
//           setError("Failed to fetch favorites.");
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   }, [user, isLoggedIn]);

//   const handleRemoveFavorite = async (movieId: number) => {
//     try {
//       await axios.delete(`${API_URL}/favorites/remove`, {
//         data: { userId: user?.id, movieId },
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//       });

//       setFavorites(favorites.filter((fav) => fav.movie.id !== movieId));
//     } catch (error) {
//       alert("Failed to remove movie from favorites.");
//     }
//   };

//   return (
//     <Container>
//       <Text size="xl" fw={700} ta="center" my="md">
//         Your Favorite Movies
//       </Text>

//       {loading && <Loader size="xl" />}
//       {error && <Alert color="red">{error}</Alert>}

//       {favorites.length > 0 ? (
//         <Grid>
//           {favorites.map((fav) => (
//             <Grid.Col key={fav.movie.id} span={4}>
//               <Card shadow="sm" p="lg" radius="md" withBorder>
//                 <Card.Section>
//                   <Image
//                     src={fav.movie.poster || "/placeholder.jpg"}
//                     alt={fav.movie.title}
//                   />
//                 </Card.Section>
//                 <Text ta="center" fw={600} mt="sm">
//                   {fav.movie.title}
//                 </Text>
//                 <Button
//                   mt="md"
//                   fullWidth
//                   color="red"
//                   onClick={() => handleRemoveFavorite(fav.movie.id)}
//                 >
//                   Remove from Favorites
//                 </Button>
//               </Card>
//             </Grid.Col>
//           ))}
//         </Grid>
//       ) : (
//         <Text ta="center">No favorite movies yet.</Text>
//       )}
//     </Container>
//   );
// };

// export default Favorites;

import React, { useEffect, useState, useContext } from "react";
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
import { AuthContext } from "../context/auth.context";
import { Notifications } from "@mantine/notifications";

const API_URL = import.meta.env.VITE_API_URL;

interface Movie {
  id: number;
  title: string;
  poster: string;
}

interface Favorite {
  movie: Movie;
}

const Favorites: React.FC = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isLoggedIn && user) {
      axios
        .get(`${API_URL}/favorites/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((res) => {
          setFavorites(res.data);
        })
        .catch(() => {
          setError("Failed to fetch favorites.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, isLoggedIn]);

  const handleRemoveFavorite = async (movieId: number) => {
    try {
      await axios.delete(`${API_URL}/favorites/remove`, {
        data: { userId: user?.id, movieId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      // Remove the movie from the favorites list
      setFavorites(favorites.filter((fav) => fav.movie.id !== movieId));

      // Show a success notification
      Notifications.show({
        title: "Success",
        message: "Movie removed from your favorites!",
        color: "teal",
        position: "top-right",
        autoClose: 3000, // Close after 3 seconds
      });
    } catch (error) {
      Notifications.show({
        title: "Error",
        message: "Failed to remove movie from favorites.",
        color: "red",
        position: "top-right",
        autoClose: 3000, // Close after 3 seconds
      });
    }
  };

  return (
    <Container>
      <Text size="xl" fw={700} ta="center" my="md">
        Your Favorite Movies
      </Text>

      {loading && <Loader size="xl" />}
      {error && <Alert color="red">{error}</Alert>}

      {favorites.length > 0 ? (
        <Grid gutter="md">
          {favorites.map((fav) => (
            <Grid.Col key={fav.movie.id} span={4}>
              <Card
                shadow="sm"
                p="lg"
                radius="md"
                withBorder
                style={{
                  height: 450,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Card.Section
                  style={{
                    flex: 1,
                    overflow: "hidden",
                    marginBottom: "1rem", // Add margin below the image
                  }}
                >
                  <Image
                    src={fav.movie.poster || "/placeholder.jpg"}
                    alt={fav.movie.title}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      borderRadius: "md",
                    }}
                  />
                </Card.Section>

                <Text ta="center" fw={600} mt="sm">
                  {fav.movie.title}
                </Text>

                <Button
                  mt="md"
                  fullWidth
                  color="red"
                  onClick={() => handleRemoveFavorite(fav.movie.id)}
                >
                  Remove from Favorites
                </Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Text ta="center">No favorite movies yet.</Text>
      )}
    </Container>
  );
};

export default Favorites;
