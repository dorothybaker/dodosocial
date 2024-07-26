import { connectToDb } from "../utils/connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const { userId } = req.params;

  const query = "SELECT * FROM users WHERE id = ?";
  connectToDb.query(query, [userId], (err, data) => {
    if (err) return res.status(500).json(err);

    const { password, ...other } = data[0];
    return res.status(200).json(other);
  });
};

export const updateUser = (req, res) => {
  const { name, username, caption, coverPic, profilePic } = req.body;
  const { accessToken } = req.cookies;
  if (!accessToken) return res.status(401).json("Not authenticated!");

  jwt.verify(accessToken, "dodosocialSecretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token");

    const query =
      "UPDATE users SET `name` = ?, `username` = ?, `caption` = ?, `coverPic` = ?, `profilePic` = ? WHERE id = ?";
    connectToDb.query(
      query,
      [name, username, caption, coverPic, profilePic, userInfo.id],
      (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) {
          return res.status(200).json("User updated!");
        }
        return res.status(403).json("Forbidden");
      }
    );
  });
};
