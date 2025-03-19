import { Request, Response } from "express";
import { db } from "../config/db";

export const search = (req: Request, res: Response): void => {
  console.log("🔍 Received search request with query:", req.query.q); // Log search request

  const query = req.query.q as string;
  if (!query) {
    console.log("❌ Search query is missing.");
    res.status(400).json({ error: "Search query is required" });
    return;
  }

  const searchQuery = `
    SELECT 'document' AS type, id, name FROM documents WHERE name LIKE ? 
    UNION
    SELECT 'folder' AS type, id, name FROM folders WHERE name LIKE ?
  `;

  console.log("📡 Executing SQL query with search term:", `%${query}%`);

  db.query(searchQuery, [`%${query}%`, `%${query}%`], (err, result) => {
    if (err) {
      console.error("❌ Database query error:", err);
      res.status(500).json({ error: "Database error", details: err });
      return;
    }
    
    console.log("✅ Query successful, returning result:", result);
    res.json(result);
  });
};
