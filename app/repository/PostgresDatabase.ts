/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { Pool } from 'pg';
import { DatabaseType } from '../domain/types';

interface TableName {
  name: string;
}

/**
 * A wrapper class around the pg module, providing
 * querying methods with async/await
 *
 * @class PostgresDatabase
 */
export class PostgresDatabase {
  db: Pool;
  type: DatabaseType;

  constructor(parameters: { [connectionString: string]: string }) {
    this.db = new Pool(parameters);
    this.type = 'pg';
  }

  /**
   * Lists all tables in the database
   *
   * @returns A Promise resolving to a list of all the tables in the database
   * @memberof PostgresDatabase
   */
  async listTables(): Promise<TableName[]> {
    return this.getAll<TableName>(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public' order by table_name"
    );
  }

  /**
   * Applies all migration scripts in the migration folder.
   * Any file ending in .sql is regarded as a migration script,
   * Scripts are applied in alphebetic order
   *
   * @memberof PostgresDatabase
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
   * @memberof PostgresDatabase
   */
  async run<T>(query: string, parameters: string[] = []): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.db.query(query, parameters, function cb(err) {
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
   * @memberof PostgresDatabase
   */
  async getFirst<T>(
    query: string,
    parameters: string[] = []
  ): Promise<T | undefined> {
    const result = await this.db.query(query, parameters);
    return result.rows[0] || undefined;
  }

  /**
   * Runs the specified query and returns all matching rows
   *
   * @param {*} query The query to run
   * @param {*} [parameters=[]] The parameters to use in the query
   * @returns A promise that resolves to a list containing all rows that match
   *          the query or an empty array if result set is empty
   * @memberof PostgresDatabase
   */
  async getAll<T>(query: string, parameters: string[] = []): Promise<T[]> {
    const results = await this.db.query(query, parameters);
    return results.rows;
  }

  /**
   * Closes the database connection
   *
   * @returns A promise resolving once the database is closed
   * @memberof PostgresDatabase
   */
  async closeConnection(): Promise<void> {
    return this.db.end();
  }

  async dropTables(): Promise<void> {
    const tables = await this.getAll<TableName>(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public' order by table_name"
    );
    for (const table of tables) {
      // eslint-disable-next-line no-await-in-loop
      await this.db.query(`drop table if exists ${table.name}`);
    }
  }
}

let instance: PostgresDatabase | null = null;
export const getInstance = (parameters: {
  [connectionString: string]: string;
}): PostgresDatabase => {
  if (instance === null) {
    instance = new PostgresDatabase(parameters);
  }
  return instance;
};
