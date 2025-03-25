// import React, { useState, useEffect, createContext } from "react";
// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;

// interface User {
//   id: number;
//   username: string;
//   email: string;
//   createdAt?: string;
// }

// interface AuthContextType {
//   isLoggedIn: boolean;
//   isLoading: boolean;
//   user: User | null;
//   storeToken: (token: string) => void;
//   authenticateUser: () => void;
//   logOutUser: () => void;
//   authError: string | null;
// }

// // Set default values for the context
// const AuthContext = createContext<AuthContextType>({
//   isLoggedIn: false,
//   isLoading: true,
//   user: null,
//   storeToken: () => {},
//   authenticateUser: () => {},
//   logOutUser: () => {},
//   authError: null,
// });

// function AuthProviderWrapper(props: React.PropsWithChildren<{}>) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [user, setUser] = useState<User | null>(null);
//   const [authError, setAuthError] = useState<string | null>(null);

//   const storeToken = (token: string) => {
//     localStorage.setItem("authToken", token);
//   };

//   const authenticateUser = () => {
//     const storedToken = localStorage.getItem("authToken");

//     if (storedToken) {
//       axios
//         .get(`${API_URL}/auth/verify`, {
//           headers: { Authorization: `Bearer ${storedToken}` },
//         })
//         .then((response) => {
//           const user = response.data as User;
//           setIsLoggedIn(true);
//           setUser(user);
//           setIsLoading(false);
//         })
//         .catch((error) => {
//           setAuthError(
//             error?.response?.data?.message || "Authentication error"
//           );
//           setIsLoggedIn(false);
//           setUser(null);
//           setIsLoading(false);
//         });
//     } else {
//       setIsLoggedIn(false);
//       setUser(null);
//       setIsLoading(false);
//     }
//   };

//   const removeToken = () => {
//     localStorage.removeItem("authToken");
//   };

//   const logOutUser = () => {
//     removeToken();
//     authenticateUser();
//   };

//   useEffect(() => {
//     authenticateUser();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn,
//         isLoading,
//         user,
//         storeToken,
//         authenticateUser,
//         logOutUser,
//         authError,
//       }}
//     >
//       {props.children}
//     </AuthContext.Provider>
//   );
// }

// export { AuthProviderWrapper, AuthContext };

import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface User {
  id: number;
  username: string;
  email: string;
  createdAt?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  storeToken: (token: string) => void;
  authenticateUser: () => void;
  logOutUser: () => void;
  authError: string | null;
}

// Set default values for the context
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  user: null,
  storeToken: () => {},
  authenticateUser: () => {},
  logOutUser: () => {},
  authError: null,
});

// Custom hook to access AuthContext
export const useAuth = () => {
  return useContext(AuthContext); // This will allow components to access the context easily
};

function AuthProviderWrapper(props: React.PropsWithChildren<{}>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const storeToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const user = response.data as User;
          setIsLoggedIn(true);
          setUser(user);
          setIsLoading(false);
        })
        .catch((error) => {
          setAuthError(
            error?.response?.data?.message || "Authentication error"
          );
          setIsLoggedIn(false);
          setUser(null);
          setIsLoading(false);
        });
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setIsLoading(false);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        authError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
