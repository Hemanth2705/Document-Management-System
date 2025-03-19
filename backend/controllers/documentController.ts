import { Request, Response } from 'express';
import { db } from '../config/db';
import { ResultSetHeader } from 'mysql2';

export const getDocuments = (req: Request, res: Response) => {
    db.query('SELECT * FROM documents', (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

export const addDocument = (req: Request, res: Response) => {
    const { name, type, folder_id } = req.body;

    db.query(
        'INSERT INTO documents (name, type, folder_id) VALUES (?, ?, ?)',
        [name, type, folder_id],
        (err, result) => {
            if (err) return res.status(500).json(err);

            // Type assertion to access `insertId`
            const insertResult = result as ResultSetHeader;
            res.json({ id: insertResult.insertId, name, type, folder_id });
        }
    );
};