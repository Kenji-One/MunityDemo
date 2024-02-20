import { createKey, getAllKeys } from "@/controllers/keyController";
const connectDB = require("../../../utils/database/database");

export default async function handler(req, res) {
  let isConnected;

  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  if (req.method === "GET") {
    return getAllKeys(req, res);
  } else if (req.method === "POST") {
    return createKey(req, res);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
