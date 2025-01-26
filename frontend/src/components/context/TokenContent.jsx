import React, { createContext, useState, useContext } from "react";

// Create the TokenContext
const TokenContext = createContext();

// Custom hook for accessing the TokenContext
export const useToken = () => useContext(TokenContext);

// Function to decode JWT token
const decodeToken = (token) => {
  try {
    if (!token) return null;
    const payloadBase64 = token.split(".")[1]; // Extract payload
    const payload = atob(payloadBase64); // Decode base64
    return JSON.parse(payload); // Convert JSON string to object
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

// Provider component
export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => localStorage.getItem("bankai") || ""
  );

  // Save token to both state and localStorage
  const saveToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("bankai", newToken);
    } else {
      localStorage.removeItem("bankai");
    }
  };

  return (
    <TokenContext.Provider value={{ token, saveToken, decodeToken }}>
      {children}
    </TokenContext.Provider>
  );
};

// Hook to get decoded token data
export const useDecodedToken = () => {
  const { token } = useToken();
  return decodeToken(token);
};
