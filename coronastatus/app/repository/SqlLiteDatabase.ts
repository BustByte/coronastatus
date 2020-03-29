/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Database } from 'sqlite3';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { DatabaseType } from '../domain/types';

interface TableName {
  name: string;
}

/**
 * A wrapper class around the sqlite3 module, providing promisified
 * querying methods
 *
 * @class SqlLiteDatabase
 */
export class SqlLiteDatabase {
  db: Database;
  type: DatabaseType;

  constructor(dbName: string) {
    this.db = new Database(dbName);
    this.type = 'sqlite';
  }

  /**
   * Lists all tables in the database
   *
   * @returns A Promise resolving to a list of all the tables in the database
   * @memberof SqlLiteDatabase
   */
  async listTables(): Promise<TableName[]> {
    return this.getAll<TableName>(
      "select name from sqlite_master where type='table' order by name"
    );
  }

  /**
   * Applies all migration scripts in the migration folder.
   * Any file ending in .sql is regarded as a migration script,
   * Scripts are applied in alphebetic order
   *
   * @memberof SqlLiteDatabase
   */
  async applyMigrationScripts(directory: string): Promise<void> {
    const files = readdirSync(directory);

    const scripts = files
      .sort()
      .filter(file => file.endsWith('.sql'))
      .map(file => String(readFileSync(join(directory, file))));

    for (const script of scripts) {
      // eslint-disable-next-line no-await-in-loop
      await this.run(script).catch(err =>
        console.error(`Could not apply all migration scripts: ${err}`)
      );
    }
  }

  /**
   * Runs the specified query against the database
   * Needs custom promisification in order to return
   * the ID of the last inserted row
   *
   * @param {*} query The query to run
   * @param {*} [parameters=[]] The parameters to use in the query
   * @returns A Promise resolving to an object {lastID: <ID of last inserted>}
   * @memberof SqlLiteDatabase
   */
  async run<T>(query: string, parameters: string[] = []): Promise<T> {
    const statement = this.db.prepare(query);

    return new Promise<T>((resolve, reject) => {
      statement.run(parameters, function cb(err) {
        statement.finalize();
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  }

  /**
   * Runs the specified query and returns the first row that matches
   *
   * @param {*} query The query to run
   * @param {*} [parameters=[]] The parameters to use in the query
   * @returns A Promise resolving to the first row that matches, null if result set is empty
   * @memberof SqlLiteDatabase
   */
  async getFirst<T>(
    query: string,
    parameters: string[] = []
  ): Promise<T | undefined> {
    const statement = this.db.prepare(query);
    // @ts-ignore
    const result = await promisify(statement.get).bind(statement)(parameters);
    statement.finalize();
    return result || undefined;
  }

  /**
   * Runs the specified query and returns all matching rows
   *
   * @param {*} query The query to run
   * @param {*} [parameters=[]] The parameters to use in the query
   * @returns A promise that resolves to a list containing all rows that match
   *          the query or an empty array if result set is empty
   * @memberof SqlLiteDatabase
   */
  async getAll<T>(query: string, parameters: string[] = []): Promise<T[]> {
    const statement = this.db.prepare(query);
    // @ts-ignore
    const results = await promisify(statement.all).bind(statement)(parameters);
    statement.finalize();
    return results;
  }

  /**
   * Closes the database connection
   *
   * @returns A promise resolving once the database is closed
   * @memberof SqlLiteDatabase
   */
  async closeConnection(): Promise<void> {
    return promisify(this.db.close).bind(this.db)();
  }

  async dropTables(): Promise<void> {
    const tables = await this.getAll<TableName>(
      "select name from sqlite_master where type='table'"
    );
    for (const table of tables) {
      // eslint-disable-next-line no-await-in-loop
      await this.run(`drop table if exists ${table.name}`);
    }
  }
}

let instance: SqlLiteDatabase | null = null;
export const getInstance = (dbName: string): SqlLiteDatabase => {
  if (instance === null) {
    instance = new SqlLiteDatabase(dbName);
  }
  return instance;
};
