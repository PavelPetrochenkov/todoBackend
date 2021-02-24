import jwt from "jsonwebtoken";
import randKey from "random-key";

const jwtKey = "my_secret_key";
const jwtTime = 3;
const jwtRefreshTime = 20;

export const createToken = (id: string) =>
  jwt.sign({ id }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtTime,
  });

export const createRefreshToken = (id: string) =>
  jwt.sign({ key: randKey.generate(20), id }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtRefreshTime,
  });

export const verifyToken = (token: string) => jwt.verify(token, jwtKey);
