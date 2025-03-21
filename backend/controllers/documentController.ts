import { Request, Response } from "express";
import { db } from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

// ✅ Get All Documents (returns an empty array if none)
export const getDocuments = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM documents");
    res.status(200).json(rows);
  } catch (err) {
    console.error("❌ Error fetching documents:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Add a New Document
export const addDocument = async (req: Request, res: Response) => {
  try {
    const { name, type, folder_id } = req.body;

    if (!name || !type) {
      return res.status(400).json({ error: "Name and type are required" });
    }

    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO documents (name, type, folder_id) VALUES (?, ?, ?)",
      [name, type, folder_id || null]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      type,
      folder_id,
    });
  } catch (err) {
    console.error("❌ Error adding document:", err);
    res.status(500).json({ error: "Failed to add document" });
  }
};
