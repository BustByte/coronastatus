/* eslint-disable camelcase */
import { getInstance, SqlLiteDatabase } from './SqlLiteDatabase';
import { CovidReport } from '../domain/types';
import { CacheWithLifetime } from './CovidReportCache';

const SELECT_ALL_COVID_REPORTS = 'select passcode, json_dump from covid_report';

const SELECT_COVID_REPORT = 'select * from covid_report where passcode = (?)';

const INSERT_NEW_COVID_REPORT =
  'insert into covid_report(passcode, json_dump) values((?), (?))';

const COUNT_NUMBER_OF_REPORTS = 'select count(*) as count from covid_report';

interface CovidReportRow {
  passcode: string;
  json_dump: string;
}

let latestReportsCache: CacheWithLifetime<CovidReportRow[]> | undefined;
const getLatestReportsCache = (): CacheWithLifetime<CovidReportRow[]> => {
  if (!latestReportsCache) {
    latestReportsCache = new CacheWithLifetime<CovidReportRow[]>(
      1,
      'LatestReportsCache'
    );
  }
  return latestReportsCache;
};

export class CovidReportRepository {
  db: SqlLiteDatabase;
  cache: CacheWithLifetime<CovidReportRow[]>;

  constructor() {
    this.cache = getLatestReportsCache();
    this.db = getInstance('covid_db');
  }

  async addNewCovidReport(
    passcode: string,
    report: CovidReport
  ): Promise<void> {
    const stringifiedReport = JSON.stringify(report);
    return this.db.run<void>(INSERT_NEW_COVID_REPORT, [
      passcode,
      stringifiedReport
    ]);
  }

  async getCovidReportByPasscode(
    passcode: string
  ): Promise<CovidReport | undefined> {
    const rows = await this.db.getAll(SELECT_COVID_REPORT, [passcode]);
    if (rows?.length) {
      return this.parseJsonDumpToCovidReport(rows.pop().json_dump);
    }
    return undefined;
  }

  async countNumberOfReports(): Promise<number | undefined> {
    return this.db
      .getFirst<{ count: number }>(COUNT_NUMBER_OF_REPORTS)
      .then(row => row?.count);
  }

  async getLatestCovidReports(): Promise<CovidReport[]> {
    const rows = await this.cache.getCachedElements(() =>
      this.db.getAll(SELECT_ALL_COVID_REPORTS)
    );
    const latestReports: { [key: string]: CovidReport } = {};
    rows.forEach((row: CovidReportRow) => {
      latestReports[row.passcode] = this.parseJsonDumpToCovidReport(
        row.json_dump
      );
    });
    return Object.values(latestReports);
  }

  private parseJsonDumpToCovidReport(jsonDump: string): CovidReport {
    return JSON.parse(jsonDump);
  }
}
