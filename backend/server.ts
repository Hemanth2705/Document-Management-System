import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import asyncHandler from "./middleware/asyncHandler"; // ✅ Import async wrapper
import { getDocuments, addDocument } from "./controllers/documentController";
import { getFolders, addFolder } from "./controllers/folderController";
import { search } from "./controllers/searchController";

// ✅ Load environment variables
dotenv.config();

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("📁 Document Management API is running");
  });
  

// ✅ Middleware
app.use(express.json()); // Handles JSON parsing
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" })); // Configurable CORS

// ✅ Documents Routes
app.get("/documents", asyncHandler(getDocuments));
app.post("/documents", asyncHandler(addDocument));

// ✅ Folders Routes
app.get("/folders", asyncHandler(getFolders));
app.post("/folders", asyncHandler(addFolder));

// ✅ Search Route
app.get("/search", asyncHandler(search));

// ✅ Global Error Handling Middleware (Should be last)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("💥 Error:", err.message);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

// ✅ Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
