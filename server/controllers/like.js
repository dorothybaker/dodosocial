import { connectToDb } from "../utils/connect.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res) => {
  const { postId } = req.query;

  const query = `SELECT userId FROM likes WHERE postId = ?`;

  connectToDb.query(query, [postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map((like) => like.userId));
  });
};

export const addLike = (req, res) => {
  const { accessToken } = req.cookies;
  const { postId } = req.body;
  if (!accessToken) return res.status(401).json("Not authenticated!");

  jwt.verify(accessToken, "dodosocialSecretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token");

    const query = "INSERT INTO likes ( `postId`, `userId`) VALUES (?, ?)";

    connectToDb.query(query, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been liked!");
    });
  });
};

export const deleteLike = (req, res) => {
  const { accessToken } = req.cookies;
  const { postId } = req.query;
  if (!accessToken) return res.status(401).json("Not authenticated!");

  jwt.verify(accessToken, "dodosocialSecretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token");

    const query = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";

    connectToDb.query(query, [userInfo.id, postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Like removed!");
    });
  });
};
