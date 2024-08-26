"use client";

import TuitionCard from "@/app/components/ui/tuitionCard";
import { useLevels } from "@/lib/context/collection/levelContext";
import { useStudents } from "@/lib/context/collection/studentsContext";
import { useSubjects } from "@/lib/context/collection/subjectContext";
import { useTutors } from "@/lib/context/collection/tutorContext";
import type { Tuition } from "@/lib/models/tuition";
import { useRouter } from "next/navigation";

type TuitionListProps = {
  tuitions: Tuition[];
  filter?: Date | null;
};

const TuitionList: React.FC<TuitionListProps> = ({ tuitions, filter }) => {
  const { tutors } = useTutors();
  const { students } = useStudents();
  const router = useRouter();
  const { subjects } = useSubjects();
  const { levels } = useLevels();

  const findSubject = (id: string) => {
    const subject = subjects.find((subject) => subject.id === id);
    return subject?.name ?? "";
  };

  const findTutor = (id: string) => {
    const tutor = tutors.find((tutor) => tutor.id === id);
    return tutor?.name ?? "";
  };

  const findStudent = (id: string) => {
    const student = students.find((student) => student.id === id);
    return student;
  };

  const findLevel = (id: string) => {
    const level = levels.find((level) => level.id === id);
    return level;
  };

  const handleCardClick = (tuitionId: string) => {
    router.push(`/tuitions/${tuitionId}`);
  };

  const filteredTuitions = tuitions.filter((tuition) => {
    if (!filter) return true; // If filter is null, return all tuition objects
    const tuitionDate = new Date(tuition.startTime ?? "").toDateString();
    const filterDate = new Date(filter).toDateString();
    return tuitionDate === filterDate; // Compare the dates only
  });

  return (
    <div>
      <div className="flex flex-col gap-2 justify-between items-center">
        {filteredTuitions.length === 0 && (
          <div className="bg-white dark:bg-neutral-800 w-full border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden p-4">
            <h1 className="flex justify-center font-normal text-neutral-500 dark:text-neutral-400">
              No Tuition Found
            </h1>
          </div>
        )}

        {filteredTuitions.map((tuition) => (
          <TuitionCard
            key={tuition.id}
            subject={findSubject(tuition.subjectId)}
            level={findLevel(tuition.levelId)}
            time={tuition.startTime ?? ""}
            duration={tuition.duration}
            status={tuition.status}
            tutor={findTutor(tuition.tutorId)}
            student={findStudent(tuition.studentId)}
            price="Unset"
            meetingLink={tuition.url}
            onClick={() => handleCardClick(tuition.id ?? "")}
          />
        ))}
      </div>
    </div>
  );
};

export default TuitionList;