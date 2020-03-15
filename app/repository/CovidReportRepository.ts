import { getInstance, SqlLiteDatabase } from './SqlLiteDatabase';
import { CovidReport, Symptom, Sex } from '../domain/types';

const SELECT_COVID_REPORT =
  'select * from covid_report where phone_number = (?)';

const INSERT_NEW_COVID_REPORT =
  'insert into covid_report(phone_number, json_dump) values((?), (?))';

export class CovidReportRepository {
  db?: SqlLiteDatabase;

  constructor() {
    if (!this.db) {
      this.db = getInstance('covid_db');
    }
  }

  async addNewCovidReportForPhoneNumber(
    phoneNumber: string,
    report: CovidReport
  ): Promise<void> {
    const stringifiedReport = JSON.stringify(report);
    return this.db?.run<void>(INSERT_NEW_COVID_REPORT, [
      phoneNumber,
      stringifiedReport
    ]);
  }

  async getCovidReportForPhoneNumber(
    phoneNumber: string
  ): Promise<CovidReport | undefined> {
    const jsonDump = await (this.db?.getFirst<string>(SELECT_COVID_REPORT, [
      phoneNumber
    ]) ?? Promise.resolve(undefined));
    return jsonDump ? this.parseJsonDumpToCovidReport(jsonDump) : undefined;
  }

  private parseJsonDumpToCovidReport(jsonDump: string): CovidReport {
    return JSON.parse(jsonDump);
  }
}
