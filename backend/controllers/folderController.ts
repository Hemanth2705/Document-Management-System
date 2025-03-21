import { Request, Response } from "express";
import { db } from "../config/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

// ✅ Get All Folders
export const getFolders = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM folders");
    res.status(200).json(rows); // Always return array (even if empty)
  } catch (err) {
    console.error("❌ Error fetching folders:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Add a New Folder
export const addFolder = async (req: Request, res: Response) => {
  try {
    const { name, parent_folder_id } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Folder name is required" });
    }

    if (parent_folder_id !== null && parent_folder_id !== undefined && isNaN(Number(parent_folder_id))) {
      return res.status(400).json({ error: "Parent folder ID must be a number" });
    }

    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO folders (name, parent_folder_id) VALUES (?, ?)",
      [name, parent_folder_id || null]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      parent_folder_id,
    });
  } catch (err) {
    console.error("❌ Error adding folder:", err);
    res.status(500).json({ error: "Failed to add folder" });
  }
};
