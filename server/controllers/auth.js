import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDb } from "../utils/connect.js";

export const register = (req, res) => {
  const { username, email, password, name } = req.body;

  // CHECK IF USER EXISTS
  const query = "SELECT * FROM users WHERE username = ? OR email = ?";
  connectToDb.query(query, [username, email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    // CREATING NEW USER
    const hashedPassword = bcrypt.hashSync(password, 12);

    const query =
      "INSERT INTO users (`name`,`username`,`email`,`password`) VALUES (?, ?, ?, ?)";
    connectToDb.query(
      query,
      [name, username, email, hashedPassword],
      (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User has been created");
      }
    );
  });
};

export const login = (req, res) => {
  const { username } = req.body;

  // CHECKING EXISTING USER
  const query = "SELECT * FROM users WHERE username = ?";
  connectToDb.query(query, [username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length == 0) return res.status(404).json("User not found!");

    const isCorrectPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!isCorrectPassword)
      return res.status(400).json("Incorrect username or password!");

    const token = jwt.sign({ id: data[0].id }, "dodosocialSecretKey");

    const { password, ...other } = data[0];
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", { secure: true, sameSite: "none" })
    .status(200)
    .json("User has been logged out!");
};

export const getMe = async (req, res) => {
  const { accessToken } = req.cookies;
  let id;

  if (!accessToken) return res.status(401).json("Not authenticated!");

  jwt.verify(accessToken, "dodosocialSecretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token");

    id = userInfo.id;
  });

  const query = "SELECT * FROM users WHERE id = ?";
  connectToDb.query(query, [id], (err, data) => {
    if (err) return res.status(500).json(err);

    const { password, ...other } = data[0];
    return res.status(200).json(other);
  });
};
