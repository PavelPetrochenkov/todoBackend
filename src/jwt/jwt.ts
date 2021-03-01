import jwt from "jsonwebtoken";
import randKey from "random-key";

export const JWT_KEY = "my_secret_key";
const jwtTime = 10;
const jwtRefreshTime = 60 * 10;

export const createToken = (id: string) =>
  jwt.sign({ id }, JWT_KEY, {
    algorithm: "HS256",
    expiresIn: jwtTime,
  });

export const createRefreshToken = (id: string) =>
  jwt.sign({ key: randKey.generate(20), id }, JWT_KEY, {
    algorithm: "HS256",
    expiresIn: jwtRefreshTime,
  });

export const verifyToken = (token: string) => jwt.verify(token, JWT_KEY);
