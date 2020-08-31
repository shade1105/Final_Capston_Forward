export class Attention {
  private _week: number;
  private _date: string;
  private _attend: string;

  constructor(week: number, date: string, attend: string) {
    this._week = week;
    this._date = date;
    this._attend = attend;
  }

  get week(): number {
    return this._week;
  }
  set week(value: number) {
    this._week = value;
  }
  get date(): string {
    return this._date;
  }
  set date(value: string) {
    this._date = value;
  }
  get attend(): string {
    return this._attend;
  }
  set attend(value: string) {
    this._attend = value;
  }
}
