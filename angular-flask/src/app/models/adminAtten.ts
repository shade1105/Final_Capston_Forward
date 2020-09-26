export class adminAtten {
  //번호 (Defalut), 이름 , 학번 ,학과, 출결현황 ,이미지(?)
  private _pvnumber: number;
  private _username: string;
  private _usernumber: number;
  private _attend: string;

  constructor(pvnumber: number, username: string, usernumber: number, attend: string) {
    this._pvnumber = pvnumber;
    this._username = username;
    this._usernumber = usernumber;
    this._attend = attend;
  }
  get pvnumber(): number {
    return this._pvnumber;
  }
  set pvnumber(value: number) {
    this.pvnumber = value;
  }
  get username(): string {
    return this._username;
  }
  set username(value: string) {
    this.username = value;
  }
  get usernumber(): number {
    return this._usernumber;
  }
  set usernumber(value: number) {
    this.usernumber = value;
  }

  get attend(): string {
    return this._attend;
  }
  set attend(value: string) {
    this.attend = value;
  }
}
