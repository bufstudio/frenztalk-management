"use client";

import { useStudents } from '@/lib/context/collection/studentsContext';
import { useStudentPage } from '@/lib/context/page/studentPageContext';
import Link from 'next/link';
import StudentTutorList from './studentTutorList';
import StudentTuitionList from './studentTuitionList';
import StudentInvoiceList from './studentInvoiceList';
import { useTuitionPage } from '@/lib/context/page/tuitionPageContext';
import { useRouter } from 'next/navigation';



export default function StudentDetail({ params }: { params: { id: string } }) {
    const { student, setStudent } = useStudentPage();
    const { students } = useStudents();
    const { setTuitionStudent } = useTuitionPage();
    const router = useRouter();


    if (student === null || student.id !== params.id) {
        const foundStudent = students.find(s => s.id === params.id);
        if (foundStudent)
            setStudent(foundStudent);
    }

    if (student === null) {
        return (
            <div>
                <h1>Student Not Found</h1>

                <button onClick={(e) => { router.back() }}>Back</button>

            </div>
        );
    }

    const addTuition = () => {
        setTuitionStudent(student)
        router.push(`/back/tuitions/add`)
    }


    return (
        <div>

            <button onClick={(e) => { router.back() }}>Back</button>


            <div>
                <h1>Student Details</h1>
                <p>Name: {student.name}</p>
                <p>Age: {student.age}</p>
                <Link href={`/back/students/${student.id}/edit`}>
                    <button>Edit</button>
                </Link>

            </div>
            <button onClick={addTuition}>Add Class</button>
            <StudentTuitionList></StudentTuitionList>
            <StudentTutorList></StudentTutorList>
            <StudentInvoiceList></StudentInvoiceList>



        </div>

    );
}