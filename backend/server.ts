import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getDocuments, addDocument } from './controllers/documentController';
import { getFolders, addFolder } from './controllers/folderController';
import { search } from "./controllers/searchController";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// ✅ Wrap search function inside an anonymous function to fix TypeScript error
app.get("/search", (req: Request, res: Response) => search(req, res));

app.get('/documents', getDocuments);
app.post('/documents', addDocument);
app.get('/folders', getFolders);
app.post('/folders', addFolder);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
