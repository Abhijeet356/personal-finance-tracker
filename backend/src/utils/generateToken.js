import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign({ userId }, jwtSecret, {
    expiresIn: "7d",
  });
};

export default generateToken;

