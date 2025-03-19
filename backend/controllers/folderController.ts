import { Request, Response } from 'express';
import { db } from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Fetch all folders
export const getFolders = (req: Request, res: Response) => {
    db.query<RowDataPacket[]>('SELECT * FROM folders', (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

// Add a new folder
export const addFolder = (req: Request, res: Response) => {
    const { name, parent_folder_id } = req.body;

    db.query<ResultSetHeader>(
        'INSERT INTO folders (name, parent_folder_id) VALUES (?, ?)',
        [name, parent_folder_id],
        (err, result) => {
            if (err) return res.status(500).json(err);

            // Type assertion to access `insertId`
            const insertResult = result as ResultSetHeader;
            res.json({ id: insertResult.insertId, name, parent_folder_id });
        }
    );
};
