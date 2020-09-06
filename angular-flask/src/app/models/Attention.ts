export class Attention {
  private _stu_num : number;
  private _week: number;
  private _date: string;
  private _attend: string;
  
  constructor(stu_num: number ,week: number, date: string, attend: string) {
    this._stu_num = stu_num;
    this._week = week;
    this._date = date;
    this._attend = attend;
  }
  get stu_num(): number {
    return this.stu_num;
  }
  set stu_num(value: number) {
    this.stu_num = value;
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
