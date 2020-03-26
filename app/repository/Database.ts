import { PostgresDatabase } from './PostgresDatabase';
import { SqlLiteDatabase } from './SqlLiteDatabase';

let instance: PostgresDatabase | SqlLiteDatabase | null = null;
export const getInstance = (
  pathOrConnectionString: string
): PostgresDatabase | SqlLiteDatabase => {
  if (instance === null) {
    if (pathOrConnectionString.includes('postgres://')) {
      instance = new PostgresDatabase({
        connectionString: pathOrConnectionString
      });
    } else instance = new SqlLiteDatabase(pathOrConnectionString);
  }
  return instance;
};
