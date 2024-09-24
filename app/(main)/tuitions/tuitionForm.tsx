

// "use client";
// import { useStudents } from '@/lib/context/collection/studentsContext';
// import { useSubjects } from '@/lib/context/collection/subjectContext';
// import { useTuitionPage } from '@/lib/context/page/tuitionPageContext';
// import { addInvoice, deleteInvoice } from '@/lib/firebase/invoice';
// import { addTuition, updateTuition } from '@/lib/firebase/tuition';
// import Currency from '@/lib/models/currency';
// import { Invoice } from '@/lib/models/invoice';
// import { Tuition } from '@/lib/models/tuition';
// import TuitionStatus from '@/lib/models/tuitionStatus';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// // import InvoiceType from '@/lib/models/invoiceType';
// import { useLevels } from '@/lib/context/collection/levelContext';
// import { useTutors } from '@/lib/context/collection/tutorContext';
// import { useZoomAccounts } from '@/lib/context/collection/zoomContext';
// import { addPayment, deletePayment } from '@/lib/firebase/payment';
// import { updateZoomAccount } from '@/lib/firebase/zoomAccount';
// import { InvoiceStatus } from '@/lib/models/invoiceStatus';
// import { Payment } from '@/lib/models/payment';
// import { Meeting, ZoomAccount } from '@/lib/models/zoom';
// import axios from 'axios';
// import { MergeInvoice } from '@/lib/models/mergeInvoice';
// import { useMergeInvoices } from '@/lib/context/collection/mergeInvoiceContext';
// import { updateMergeInvoice } from '@/lib/firebase/mergeInvoice';
// import { useMergePayments } from '@/lib/context/collection/mergePaymentContext';
// import { MergePayment } from '@/lib/models/mergePayment';
// import { updateMergePayment } from '@/lib/firebase/mergePayment';
// import { useInvoices } from '@/lib/context/collection/invoiceContext';
// import { usePayments } from '@/lib/context/collection/paymentContext';

// export default function TuitionForm() {
//     const router = useRouter();
//     const { levels } = useLevels();
//     const { tuition, student, tutor, subject, setTuition } = useTuitionPage();

//     const { students } = useStudents()
//     const { tutors } = useTutors()
//     const { subjects } = useSubjects()
//     // const { subjects } = useTuition()
//     const { zoomAccounts } = useZoomAccounts()


//     const [name, setName] = useState(tuition?.name || '');
//     const [studentId, setStudentId] = useState(tuition?.studentId || student?.id || '');
//     const [tutorId, setTutorId] = useState(tuition?.tutorId || tutor?.id || '');
//     const [subjectId, setSubjectId] = useState(tuition?.subjectId || subject?.id || '');
//     const [status, setStatus] = useState(tuition?.status || '');
//     const [levelId, setLevelId] = useState(tuition?.levelId || '');



//     const [currency, setCurrency] = useState<Currency>(tuition?.currency || Currency.MYR);
//     const [studentPrice, setStudentPrice] = useState(tuition?.studentPrice || 0);
//     const [tutorPrice, setTutorPrice] = useState(tuition?.tutorPrice || 0);
//     const [startDateTime, setStartDateTime] = useState(tuition?.startTime?.slice(0, 16) || '');
//     const [duration, setDuration] = useState(tuition?.duration || 60);
//     const [repeatWeeks, setRepeatWeeks] = useState(1);
//     const [trial, setTrial] = useState<boolean>(tuition?.trial || true);





//     useEffect(() => {
//         if (levelId !== '') {
//             const selectedLevel = levels.find(l => levelId === l.id);
//             switch (currency) {
//                 case Currency.USD:
//                     setStudentPrice(selectedLevel!.student_price_usd);
//                     setTutorPrice(selectedLevel!.tutor_price_usd);
//                     break;
//                 case Currency.GBP:
//                     setStudentPrice(selectedLevel!.student_price_gbp);
//                     setTutorPrice(selectedLevel!.tutor_price_gbp);
//                     break;
//                 case Currency.MYR:
//                 default:
//                     setStudentPrice(selectedLevel!.student_price_myr);
//                     setTutorPrice(selectedLevel!.tutor_price_myr);
//                     break;
//             }
//         }
//     }, [levelId, currency]);


//     const authToken = async (zoom: ZoomAccount) => {

//         try {
//             console.log('token')
//             console.log(zoom.clientid)
//             console.log(zoom.clientsecret)
//             console.log(zoom.accountid)
//             const response = await axios.post('/api/auth/authorize', {
//                 clientId: zoom.clientid,
//                 clientSecret: zoom.clientsecret,
//                 accountId: zoom.accountid,
//             });
//             const data = response.data['access_token']
//             console.error(data);
//             return data
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     const createZoom = async (account: ZoomAccount, topic: string, start_time: string, duration: number) => {
//         try {
//             const token = await authToken(account)
//             const response = await axios.post('/api/addZoom', {
//                 accessToken: token,
//                 topic: topic,
//                 start_time: start_time,
//                 duration: duration,
//                 password: null,
//             });
//             const meetingid = response.data.id
//             const url = response.data.join_url
//             console.log(url);
//             return { meetingid, url }
//         } catch (error) {
//             console.error(error);
//             return null
//         }
//     }


//     const updateZoom = async (zoom: ZoomAccount, meetingId: string, topic: string, start_time: string, duration: number) => {
//         try {
//             const token = await authToken(zoom)
//             const response = await axios.post('/api/updateZoom', {
//                 accessToken: token,
//                 meetingId: meetingId,
//                 topic: topic,
//                 start_time: start_time,
//                 duration: duration,
//                 password: null,
//                 recurrence: null,
//             });
//             if (response.status === 204) {
//                 console.log('Meeting updated successfully.');
//                 return { success: true };
//             } else {
//                 // Handle other status codes if needed
//                 console.error('Unexpected response status:', response.status);
//                 return { success: false, error: `Unexpected response status: ${response.status}` };
//             }

//         } catch (error: any) {
//             if (error.response) {
//                 console.error('Error response data:', error.response.data);
//                 console.error('Error response status:', error.response.status);
//                 return { success: false, error: error.response.data.message };
//             } else {
//                 console.error('Error message:', error.message);
//                 return { success: false, error: 'An error occurred' };
//             }
//         }
//     }



//     function getZoomAcc(zoomStartTime: string, duration: number): ZoomAccount | null {
//         // Convert the proposed start time and duration to a comparable format
//         const newStartTime = new Date(zoomStartTime).getTime();
//         const newEndTime = newStartTime + duration * 60 * 1000; // Convert duration from minutes to milliseconds
//         console.log('zoom')
//         console.log(zoomAccounts)
//         for (const zoom of zoomAccounts) {
//             let hasOverlap = false;
//             console.log(zoom.email)

//             if (zoom.meetings.length === 0) {
//                 console.log('no meeting')
//                 return zoom
//             }

//             for (const meeting of zoom.meetings) {
//                 // Convert existing meeting start time to a comparable format
//                 const meetingStartTime = new Date(meeting.start).getTime();
//                 const meetingEndTime = meetingStartTime + meeting.duration * 60 * 1000; // Convert duration from minutes to milliseconds

//                 // Check if the new meeting overlaps with any existing meeting
//                 if (
//                     (newStartTime >= meetingStartTime && newStartTime < meetingEndTime) ||
//                     (newEndTime > meetingStartTime && newEndTime <= meetingEndTime) ||
//                     (newStartTime <= meetingStartTime && newEndTime >= meetingEndTime)
//                 ) {
//                     console.log('overlap')
//                     hasOverlap = true;
//                     break; // No need to check further meetings for this account
//                 }
//             }

//             if (!hasOverlap) {
//                 return zoom; // Return the first account without overlaps
//             }
//         }

//         return null; // All accounts have overlaps
//     }



//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         try {

//             const startTime = new Date(startDateTime);

//             if (tuition === null) {

//                 for (let i = 0; i <= repeatWeeks - 1; i++) {
//                     const newStartTime = new Date(startTime.getTime() + (i * 7 * 24 * 60 * 60 * 1000) + (8 * 60 * 60 * 1000));
//                     const zoomStartTime = newStartTime.toISOString();
//                     // const 

//                     const zoomAcc = getZoomAcc(zoomStartTime, duration)

//                     if (zoomAcc === null) {
//                         console.log('No Zoom Account Available')
//                         throw ('No Zoom Account Available')
//                     }

//                     const zoom = await createZoom(zoomAcc!, name, zoomStartTime, duration)

//                     let meeting = zoomAcc.meetings
//                     const meet = new Meeting(zoomStartTime, duration)
//                     meeting.push(meet)
//                     const upZoom = new ZoomAccount(zoomAcc.id, zoomAcc.email, zoomAcc.clientid, zoomAcc.clientsecret, zoomAcc.accountid, meeting)
//                     updateZoomAccount(upZoom)

//                     if (zoom !== null) {
//                         const { meetingid, url } = zoom
//                         const newTuition = new Tuition(
//                             null,
//                             name,
//                             tutorId,
//                             studentId,
//                             subjectId,
//                             levelId,
//                             status,
//                             zoomStartTime,
//                             duration,
//                             url,
//                             studentPrice,
//                             tutorPrice,
//                             currency,
//                             null,
//                             null,
//                             meetingid,
//                             (i === 0 && trial)
//                         );
//                         const tid = await addTuition(newTuition);
//                     } else {
//                         console.log('Failed to create zoom meeting')
//                         throw ('Failed to create zoom meeting')
//                     }


//                 }


//             } else {
//                 const newStartTime = new Date(startTime.getTime() + (8 * 60 * 60 * 1000));

//                 const zoomStartTime = newStartTime.toISOString()

//                 if (tuition.startTime !== zoomStartTime || tuition.name !== name || tuition.duration !== duration) {
//                     const zoomAcc = getZoomAcc(zoomStartTime, duration)

//                     if (zoomAcc === null) {
//                         console.log('No Zoom Account Available')
//                         throw ('No Zoom Account Available')
//                     }
//                     console.log(tuition.meetingId!)
//                     await updateZoom(zoomAcc!, tuition.meetingId!, name, zoomStartTime, duration,)

//                     // error handling
//                     let meeting = zoomAcc.meetings
//                     const meet = new Meeting(zoomStartTime, duration)
//                     meeting.push(meet)
//                     const upZoom = new ZoomAccount(zoomAcc.id, zoomAcc.email, zoomAcc.clientid, zoomAcc.clientsecret, zoomAcc.accountid, meeting)
//                     updateZoomAccount(upZoom)
//                 }

//                 // let newInvoice: boolean = false
//                 let tiid = tuition.tutorInvoiceId;
//                 let siid = tuition.studentInvoiceId;
//                 if (tuition.status !== TuitionStatus.END && status === TuitionStatus.END && (tiid === null || siid === null)) {
//                     const month = zoomStartTime.slice(0, 7);
//                     if (siid === null) {
//                         const studentRate = studentPrice * duration / 60
//                         const studentInvoice = new Invoice(
//                             null,
//                             tuition.id!,
//                             tutorId,
//                             studentId,
//                             subjectId,
//                             studentRate,
//                             InvoiceStatus.PENDING,
//                             zoomStartTime,
//                             duration,
//                             currency,
//                             studentPrice,
//                             // InvoiceType.STUDENT
//                         )

//                         siid = await addInvoice(studentInvoice)

//                         const { mergeInvoices } = useMergeInvoices()

//                         const mergeInvoiceId = month + studentId
//                         const existMergeInvoice = mergeInvoices.find(minv => minv.id === mergeInvoiceId);

//                         if (existMergeInvoice) {
//                             const mergeInvoice = new MergeInvoice(
//                                 mergeInvoiceId,
//                                 [...existMergeInvoice.invoicesId, siid!],
//                                 month,
//                                 existMergeInvoice.rate + studentRate,
//                                 InvoiceStatus.PENDING,
//                                 existMergeInvoice.currency,
//                                 studentId
//                             )

//                             await updateMergeInvoice(mergeInvoice)
//                         } else {
//                             const mergeInvoice = new MergeInvoice(
//                                 mergeInvoiceId,
//                                 [siid!],
//                                 month,
//                                 studentRate,
//                                 InvoiceStatus.PENDING,
//                                 currency,
//                                 studentId
//                             )

//                             await updateMergeInvoice(mergeInvoice)
//                         }

//                     }
//                     if (tiid === null) {
//                         const tutorRate = tutorPrice * duration / 60
//                         const tutorPayment = new Payment(
//                             null,
//                             tuition.id!,
//                             tutorId,
//                             studentId,
//                             subjectId,
//                             tutorRate,
//                             InvoiceStatus.PENDING,
//                             zoomStartTime,
//                             duration,
//                             currency,
//                             tutorPrice,
//                             // InvoiceType.TUTOR,
//                         )

//                         tiid = await addPayment(tutorPayment)

//                         const { mergePayments } = useMergePayments()

//                         const mergePaymentId = month + tutorId
//                         const existMergePayment = mergePayments.find(minv => minv.id === mergePaymentId);

//                         if (existMergePayment) {
//                             const mergePayment = new MergePayment(
//                                 mergePaymentId,
//                                 [...existMergePayment.paymentsId, tiid!],
//                                 month,
//                                 existMergePayment.rate + tutorRate,
//                                 InvoiceStatus.PENDING,
//                                 currency, 
//                                 tutorId
//                             )

//                             await updateMergePayment(mergePayment)
//                         } else {
//                             const mergePayment = new MergePayment(
//                                 mergePaymentId,
//                                 [siid!],
//                                 month,
//                                 tutorRate,
//                                 InvoiceStatus.PENDING,
//                                 tuition.currency,
//                                 tutorId
//                             )

//                             await updateMergePayment(mergePayment)
//                         }
//                     }
//                 }

//                 if (tuition.status === TuitionStatus.END && status !== TuitionStatus.END && tiid && siid) {

//                     const month = tuition.startTime.slice(0, 7)
//                     const mergeInvoiceId = month + studentId
//                     const mergePaymentId = month + tutorId

//                     const { mergeInvoices } = useMergeInvoices()
//                     const { mergePayments } = useMergePayments()

//                     const mergeInvoice = mergeInvoices.find(minv => minv.id === mergeInvoiceId);
//                     const mergePayment = mergePayments.find(minv => minv.id === mergePaymentId);

//                     let updatedMergeInvoice = mergeInvoice
//                     let updatedMergePayment = mergePayment

//                     updatedMergeInvoice?.invoicesId.filter(invoiceId => invoiceId !== siid);
//                     updatedMergePayment?.paymentsId.filter(paymentId => paymentId !== tiid);
//                     if (updatedMergeInvoice) {
//                         const { invoices } = useInvoices()
//                         const inv = invoices.find(inv => inv.id === siid)
//                         updatedMergeInvoice.rate = updatedMergeInvoice.rate - (inv?.rate ?? 0)
//                         await updateMergeInvoice(updatedMergeInvoice)

//                     }
//                     if (updatedMergePayment) {
//                         const { payments } = usePayments()
//                         const pay = payments.find(inv => inv.id === tiid)
//                         updatedMergePayment.rate = updatedMergePayment.rate - (pay?.rate ?? 0)
//                         await updateMergePayment(updatedMergePayment)

//                     }

//                     await deleteInvoice(siid)
//                     await deletePayment(tiid)

//                 }


//                 const updatedTuition = new Tuition(
//                     tuition.id,
//                     name,
//                     tutorId,
//                     studentId,
//                     subjectId,
//                     levelId,
//                     status,
//                     zoomStartTime,
//                     duration,
//                     tuition.url,
//                     studentPrice,
//                     tutorPrice,
//                     currency,
//                     siid,
//                     tiid,
//                     tuition.meetingId,
//                     trial
//                 )
//                 await updateTuition(updatedTuition)



//                 setTuition(updatedTuition)

//             }
//             router.back()

//         } catch (error) {
//             console.error("Failed to submit the form", error);
//         }
//     };

//     return (

//         <form onSubmit={handleSubmit}>

//             <div>
//                 <label htmlFor="name">Name:</label>
//                 <input
//                     type="text"
//                     id="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="student">Student:</label>
//                 <select
//                     id="student"
//                     value={studentId}
//                     onChange={(e) => setStudentId(e.target.value)}
//                 >
//                     <option value="" disabled selected>Choose Student</option>
//                     {students.map(student => (
//                         <option key={student.id} value={student.id!}>{student.name}</option>
//                     ))}
//                 </select>
//             </div>
//             <div>
//                 <label htmlFor="tutor">Tutor:</label>
//                 <select
//                     id="tutor"
//                     value={tutorId}
//                     onChange={(e) => setTutorId(e.target.value)}
//                 >
//                     <option value="" disabled selected>Choose Tutor</option>
//                     {tutors.map(tutor => (
//                         <option key={tutor.id} value={tutor.id!}>{tutor.name}</option>
//                     ))}
//                 </select>
//             </div>
//             <div>
//                 <label htmlFor="subject">Subject:</label>
//                 <select
//                     id="subject"
//                     value={subjectId}
//                     onChange={(e) => setSubjectId(e.target.value)}
//                 >
//                     <option value="" disabled selected>Choose Subject</option>
//                     {subjects.map(subject => (
//                         <option key={subject.id} value={subject.id!}>{subject.name}</option>
//                     ))}
//                 </select>
//             </div>

//             <div>
//                 <label htmlFor="level-dropdown">Select Level: </label>
//                 <select
//                     id="level-dropdown"
//                     value={levelId}
//                     onChange={(e) => setLevelId(e.target.value)}
//                 >
//                     <option value="" disabled>Select a level</option>
//                     {levels.map((level) => (
//                         <option key={level.id} value={level.id!}>
//                             {level.name}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             <div>
//                 <label htmlFor="status">Status:</label>
//                 <select
//                     id="status"
//                     value={status}
//                     onChange={(e) => setStatus(e.target.value as TuitionStatus)}
//                 >
//                     {Object.values(TuitionStatus).map((statusValue) => (
//                         <option key={statusValue} value={statusValue}>
//                             {statusValue.charAt(0).toUpperCase() + statusValue.slice(1)}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             <div>
//                 <label htmlFor="currency">Currency:</label>
//                 <select
//                     id="currency"
//                     value={currency}
//                     onChange={(e) => setCurrency(e.target.value as Currency)}
//                 >
//                     {Object.values(Currency).map(curr => (
//                         <option key={curr} value={curr}>{curr}</option>
//                     ))}
//                 </select>
//             </div>


//             <div>
//                 <label htmlFor="price">Student Price / hour:</label>
//                 <input
//                     type="number"
//                     id="studentPrice"
//                     value={studentPrice}
//                     onChange={(e) => setStudentPrice(Number(e.target.value))}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="price">Tutor Price / hour:</label>
//                 <input
//                     type="number"
//                     id="tutorPrice"
//                     value={tutorPrice}
//                     onChange={(e) => setTutorPrice(Number(e.target.value))}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="startDateTime">Start Date & Time:</label>
//                 <input
//                     type="datetime-local"
//                     id="startDateTime"
//                     value={startDateTime}
//                     onChange={(e) => setStartDateTime(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="duration">Duration ( minutes ):</label>
//                 <input
//                     type="number"
//                     id="duration"
//                     value={duration}
//                     onChange={(e) => setDuration(Number(e.target.value))}
//                 />
//             </div>
//             {tuition === null && <div>
//                 <label htmlFor="repeatWeeks">Repeat Weeks:</label>
//                 <input
//                     type="number"
//                     id="repeatWeeks"
//                     value={repeatWeeks}
//                     onChange={(e) => setRepeatWeeks(Number(e.target.value))}
//                 />
//             </div>}
//             <div>
//                 <label>
//                     <input
//                         type="checkbox"
//                         checked={trial}
//                         onChange={(e) => setTrial(e.target.checked)}
//                     />
//                     Set First Class as Trial
//                 </label>
//             </div>

//             <div>
//                 <button type="submit">Save</button>
//                 <button type="button" onClick={() => router.back()}>Cancel</button>
//             </div>
//         </form>

//     );
// }