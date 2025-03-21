import { Request, Response } from "express";
import { db } from "../config/db";
import { RowDataPacket } from "mysql2";

// ✅ Search Documents and Folders
export const search = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;

    if (!query || query.trim() === "") {
      // ✅ If empty, return all documents & folders instead of error
      const allDocumentsQuery = `SELECT 'document' AS type, id, name, created_by, date, size FROM documents`;
      const allFoldersQuery = `SELECT 'folder' AS type, id, name, created_by, date FROM folders`;

      const [allDocuments] = await db.query<RowDataPacket[]>(allDocumentsQuery);
      const [allFolders] = await db.query<RowDataPacket[]>(allFoldersQuery);

      return res.status(200).json({
        documents: allDocuments,
        folders: allFolders,
      });
    }

    const searchQuery = `
      SELECT 'document' AS type, id, name, created_by, date, size FROM documents WHERE name LIKE ? 
      UNION
      SELECT 'folder' AS type, id, name, created_by, date FROM folders WHERE name LIKE ?
    `;

    const values = [`%${query}%`, `%${query}%`];

    const [rows] = await db.query<RowDataPacket[]>(searchQuery, values);

    // ✅ Separate documents and folders
    const documents = rows.filter((row) => row.type === "document");
    const folders = rows.filter((row) => row.type === "folder");

    console.log("🔍 Search Query Results:", { documents, folders }); // ✅ Debugging Output

    res.status(200).json({ documents, folders });

  } catch (err) {
    console.error("❌ Error executing search:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
