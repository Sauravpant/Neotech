import jwt from "jsonwebtoken";

export const generateAccessToken = async (_id: string, role: string) => {
  return jwt.sign({ _id, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
};

export const generateRefreshToken = async (_id: string, role: string) => {
  return jwt.sign({ _id, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2d" });
};
