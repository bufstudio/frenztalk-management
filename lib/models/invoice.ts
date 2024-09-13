import Currency from "./currency";
import { InvoiceStatus } from "./invoiceStatus";

export interface Invoice {
  id: string | null,
  tuitionId: string,
  tutorId: string,
  studentId: string,
  subjectId: string,
  rate: number,
  status: InvoiceStatus,
  startDateTime: string,
  duration: number,
  currency: Currency,
  price: number,


}
