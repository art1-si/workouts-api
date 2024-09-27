import { RequestHandler } from "express";
import { postgresqlDatabaseClient } from "../data_source/postgresql_database_client";

export const getExercises: RequestHandler = async (req, res, next) => {
    try{
        console.log('Hello from getExercises');
        const result = await postgresqlDatabaseClient.query('SELECT * FROM exercise');
        console.log(result.rows);
        res.status(200).json(result.rows);
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        next();
    }
 
};