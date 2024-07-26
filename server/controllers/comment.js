import { connectToDb } from "../utils/connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const { postId } = req.query;

  const query = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.commentUserId) WHERE c.postId = ? ORDER BY c.createdAt DESC`;

  connectToDb.query(query, [postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  const { accessToken } = req.cookies;
  const { description, postId } = req.body;
  if (!accessToken) return res.status(401).json("Not authenticated!");

  jwt.verify(accessToken, "dodosocialSecretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token");

    const query =
      "INSERT INTO comments (`commentUserId`, `description`, `postId`, `createdAt`) VALUES (?, ?, ?, ?)";

    connectToDb.query(
      query,
      [
        userInfo.id,
        description,
        postId,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      ],
      (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Comment has been created!");
      }
    );
  });
};

export const deleteComment = (req, res) => {
  const { accessToken } = req.cookies;
  const { id } = req.params;
  if (!accessToken) return res.status(401).json("Not authenticated!");

  jwt.verify(accessToken, "dodosocialSecretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token");

    const query = "DELETE FROM comments WHERE `id` = ? AND `commentUserId` = ?";

    connectToDb.query(query, [id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Comment has been deleted!");
      return res.status(403).json("Forbidden!");
    });
  });
};
