import {open} from 'sqlite';
import sqlite3 from 'sqlite3';

let dbInstance = null;

export async function initDB() {
    dbInstance = await open({
        filename: "db/data.sqlite",
        driver: sqlite3.Database,
    });

    await dbInstance.exec(`
            CREATE TABLE IF NOT EXISTS trajets (
                id              INTEGER     PRIMARY KEY AUTOINCREMENT,
                idTrain         INTEGER     NOT NULL,
                type            TEXT        NOT NULL DEFAULT 'depart',
                typeTrain       TEXT        NOT NULL DEFAULT 'SNCF',
                quai            TEXT        NOT NULL,
                provenance      TEXT        NOT NULL,
                destination     TEXT        NOT NULL,
                arrets          TEXT,
                retard          INT         NOT NULL DEFAULT 0

            );

            CREATE TABLE IF NOT EXISTS typestrains (
                id              INTEGER     PRIMARY KEY AUTOINCREMENT,
                nom             TEXT        NOT NULL,
                nomAff          TEXT        NOT NULL DEFAULT 'SNCF',
                logo            TEXT        NOT NULL DEFAULT 'sncf.png'
            );

            CREATE TABLE IF NOT EXISTS flash (
                id              INTEGER     PRIMARY KEY AUTOINCREMENT,
                long            TEXT        NOT NULL,
                court           TEXT
            );
        `);
}

export async function getDB() {
    if (!dbInstance) {
        throw new Error("DB non initialisée.");
    }
    return dbInstance;
}