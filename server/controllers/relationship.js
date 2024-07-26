import { connectToDb } from "../utils/connect.js";
import jwt from "jsonwebtoken";

export const getRelationships = (req, res) => {
  const { followedUserId } = req.query;

  const query = `SELECT followerUserId FROM relationships WHERE followedUserId = ?`;

  connectToDb.query(query, [followedUserId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json(data.map((relationship) => relationship.followerUserId));
  });
};

export const addRelationship = (req, res) => {
  const { accessToken } = req.cookies;
  const { userId } = req.body;
  if (!accessToken) return res.status(401).json("Not authenticated!");

  jwt.verify(accessToken, "dodosocialSecretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token");

    const query =
      "INSERT INTO relationships ( `followerUserId`, `followedUserId`) VALUES (?, ?)";

    connectToDb.query(query, [userInfo.id, userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User followed!");
    });
  });
};

export const deleteRelationship = (req, res) => {
  const { accessToken } = req.cookies;
  const { userId } = req.query;
  if (!accessToken) return res.status(401).json("Not authenticated!");

  jwt.verify(accessToken, "dodosocialSecretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Invalid token");

    const query =
      "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";

    connectToDb.query(query, [userInfo.id, userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollowed!");
    });
  });
};
