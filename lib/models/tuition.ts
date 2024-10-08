import Currency from "./currency";

export class Tuition {
  constructor(
    public id: string | null,
    public name: string,
    public tutorId: string,
    public studentId: string,
    public subjectId: string,
    public levelId: string,
    public status: string,
    public startTime: string,
    public timezone: string,
    public duration: number,
    public url: string,
    public studentPrice: number,
    public tutorPrice: number,
    public currency: Currency,
    public studentInvoiceId: string | null,
    public tutorInvoiceId: string | null,
    public meetingId: string | null,
    public trial: boolean,
    public zoomAcc: string | null,

  ) { }

  static fromMap(data: Record<string, any>, id: string) {
    return new Tuition(
      id,
      data.name,
      data.tutorId,
      data.studentId,
      data.subjectId,
      data.levelId,
      data.status,
      data.startTime,
      data.timezone,
      data.duration,
      data.url,
      data.studentPrice,
      data.tutorPrice,
      data.currency,
      data.studentInvoiceId,
      data.tutorInvoiceId,
      data.meetingId,
      data.trial,
      data.zoomAcc,
    );
  }

  toMap(): Record<string, any> {
    return {
      name: this.name,
      tutorId: this.tutorId,
      studentId: this.studentId,
      subjectId: this.subjectId,
      levelId: this.levelId,
      status: this.status,
      startTime: this.startTime,
      duration: this.duration,
      url: this.url,
      studentPrice: this.studentPrice,
      tutorPrice: this.tutorPrice,
      currency: this.currency,
      studentInvoiceId: this.studentInvoiceId,
      tutorInvoiceId: this.tutorInvoiceId,
      meetingId: this.meetingId,
      trial: this.trial,
      zoomAcc: this.zoomAcc,
    };
  }
}
