import { getKeyById, updateKey, deleteKey } from "@/controllers/keyController";
const connectDB = require("../../../utils/database/database");

export default async function handler(req, res) {
  let isConnected;
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  if (req.method === "GET") {
    return getKeyById(req, res);
  } else if (req.method === "PUT") {
    return updateKey(req, res);
  } else if (req.method === "DELETE") {
    return deleteKey(req, res);
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
