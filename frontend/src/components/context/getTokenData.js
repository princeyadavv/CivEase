import jwt from "jsonwebtoken";

// Decode and fetch data from the token
const getTokenData = (token) => {
  if (!token) return null;

  try {
    // Decode the JWT token
    const decoded = jwt.decode(token);
    console.log(decoded);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null; // Return null if the token is invalid
  }
};

getTokenData();
