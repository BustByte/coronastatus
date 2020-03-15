import { getInstance, SqlLiteDatabase } from './SqlLiteDatabase';
import { CovidReport } from '../domain/types';

const SELECT_ALL_COVID_REPORTS = 'select json_dump from covid_report';

const SELECT_COVID_REPORT =
  'select * from covid_report where phone_number = (?)';

const INSERT_NEW_COVID_REPORT =
  'insert into covid_report(phone_number, json_dump) values((?), (?))';

const SET_VERIFICATION_SUCCEEDED =
  'update covid_report set is_verified = 1 where phone_number = (?)';

export class CovidReportRepository {
  db?: SqlLiteDatabase;

  constructor() {
    if (!this.db) {
      this.db = getInstance('covid_db');
    }
  }

  async addNewCovidReportForHashedPhoneNumber(
    hashedPhoneNumber: string,
    report: CovidReport
  ): Promise<void> {
    const stringifiedReport = JSON.stringify(report);
    return this.db?.run<void>(INSERT_NEW_COVID_REPORT, [
      hashedPhoneNumber,
      stringifiedReport
    ]);
  }

  async getCovidReportForHashedPhoneNumber(
    hashedPhoneNumber: string
  ): Promise<CovidReport | undefined> {
    const jsonDump = await (this.db?.getFirst<string>(SELECT_COVID_REPORT, [
      hashedPhoneNumber
    ]) ?? Promise.resolve(undefined));
    return jsonDump ? this.parseJsonDumpToCovidReport(jsonDump) : undefined;
  }

  async saveVerificationSucceededForHashedPhoneNumber(
    hashedPhoneNumber: string
  ): Promise<void> {
    return this.db?.run<void>(SET_VERIFICATION_SUCCEEDED, [hashedPhoneNumber]);
  }

  async getAllCovidReports(): Promise<CovidReport[]> {
    const results = await this.db?.getAll(SELECT_ALL_COVID_REPORTS);
    const reports = [];
    for (const row of results) {
      reports.push(this.parseJsonDumpToCovidReport(row.json_dump));
    }
    return reports;
  }

  private parseJsonDumpToCovidReport(jsonDump: string): CovidReport {
    return JSON.parse(jsonDump);
  }
}
