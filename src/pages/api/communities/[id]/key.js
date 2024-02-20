import { addOrUpdateKey } from "@/controllers/key";

export default async function handler(req, res) {
  if (req.method === "POST" || req.method === "PUT") {
    // Use POST for adding and PUT for updating the key
    return addOrUpdateKey(req, res);
  } else {
    res.setHeader("Allow", ["POST", "PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
