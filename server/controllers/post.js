import { connectToDb } from "../utils/connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const { userId } = req.query;
  const { accessToken } = req.cookies;
  if (!accessToken) return res.status(401).json("Not authenticated!");

  jwt.verify(accessToken, "dodosocialSecretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token");

    // FETCHING POSTS ACCORDING TO THOSE YOU FOLLOW
    // `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC`
    const query =
      userId !== "undefined"
        ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
        : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) ORDER BY p.createdAt DESC`;

    const values = userId !== "undefined" ? [userId] : [];

    connectToDb.query(query, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  const { accessToken } = req.cookies;
  const { description, image } = req.body;
  if (!accessToken) return res.status(401).json("Not authenticated!");

  jwt.verify(accessToken, "dodosocialSecretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token");

    const query =
      "INSERT INTO posts (`description`, `image`, `userId`, `createdAt`) VALUES (?, ?, ?, ?)";

    connectToDb.query(
      query,
      [
        description,
        image,
        userInfo.id,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      ],
      (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been created!");
      }
    );
  });
};

export const deletePost = (req, res) => {
  const { accessToken } = req.cookies;
  const { id } = req.params;
  if (!accessToken) return res.status(401).json("Not authenticated!");

  jwt.verify(accessToken, "dodosocialSecretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token");
    const query = "DELETE FROM posts WHERE `id`=? AND `userId` = ?";

    connectToDb.query(query, [id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Post has been deleted.");
      return res.status(403).json("Forbidden");
    });
  });
};
