/* eslint-disable camelcase */
import { getInstance, SqlLiteDatabase } from './SqlLiteDatabase';
import { CovidReport } from '../domain/types';
import { CacheWithLifetime } from './CacheWithLifetime';

import config from '../config';

const SELECT_ALL_COVID_REPORTS = 'select passcode, json_dump from covid_report';

const SELECT_COVID_REPORT = 'select * from covid_report where passcode = (?)';

const INSERT_NEW_COVID_REPORT =
  'insert into covid_report(passcode, json_dump) values((?), (?))';

const COUNT_NUMBER_OF_REPORTS = 'select count(*) as count from covid_report';

interface CovidReportRow {
  passcode: string;
  json_dump: string;
}

type PassCodeReports = { [passcode: string]: CovidReport[] };

const allReportsCache = new CacheWithLifetime<PassCodeReports>(
  1,
  'AllReportsCache'
);

export class CovidReportRepository {
  db: SqlLiteDatabase;

  constructor() {
    this.db = getInstance(config.DB_PATH);
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
    const rows = await this.db.getAll<CovidReportRow>(SELECT_COVID_REPORT, [
      passcode
    ]);
    const lastRow = rows.pop();
    if (lastRow) {
      return this.parseJsonDumpToCovidReport(lastRow.json_dump);
    }
    return undefined;
  }

  async countNumberOfReports(): Promise<number | undefined> {
    return this.db
      .getFirst<{ count: number }>(COUNT_NUMBER_OF_REPORTS)
      .then(row => row?.count);
  }

  async getAllCovidReports(): Promise<PassCodeReports> {
    const allReports = await allReportsCache.getCachedElements(() =>
      this.fetchAllReportsFromDatabase()
    );
    return allReports;
  }

  async fetchAllReportsFromDatabase(): Promise<PassCodeReports> {
    const rows = await this.db.getAll<CovidReportRow>(SELECT_ALL_COVID_REPORTS);
    const allReports: PassCodeReports = {};
    rows.forEach((row: CovidReportRow) => {
      const report = this.parseJsonDumpToCovidReport(row.json_dump);
      if (row.passcode in allReports) {
        allReports[row.passcode].push(report);
      } else {
        allReports[row.passcode] = [report];
      }
    });
    return allReports;
  }

  async getLatestCovidReports(): Promise<CovidReport[]> {
    const allReports: {
      [passcode: string]: CovidReport[];
    } = (await allReportsCache.getCachedElements(() =>
      this.fetchAllReportsFromDatabase()
    )) as PassCodeReports;

    const latestReports: CovidReport[] = [];
    Object.keys(allReports).forEach((passcode: string) => {
      const reports = allReports[passcode];
      latestReports.push(reports[reports.length - 1]);
    });
    return latestReports;
  }

  private parseJsonDumpToCovidReport(jsonDump: string): CovidReport {
    return JSON.parse(jsonDump);
  }
}
