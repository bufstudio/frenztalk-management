import { Timestamp } from "firebase/firestore";
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
    public startTime: Timestamp | null,
    public duration: number,
    public url: string,
    public studentPrice: number,
    public tutorPrice: number,
    public currency: Currency,
    public studentInvoiceId: string | null,
    public tutorInvoiceId: string | null,
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
      data.duration,
      data.url,
      data.studentPrice,
      data.tutorPrice,
      data.currency,
      data.studentInvoiceId,
      data.tutorInvoiceId,
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
    };
  }
}
