"use client";

import { useRouter } from "next/navigation";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  Card,
  CardContent,
} from "@/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/app/components/ui/dialog";
import TuitionForm from "../../components/tuitionForm";

function LoadingContent() {
  return (
    <div className="animate-pulse">
      <div className="h-6 bg-black dark:bg-neutral-800 rounded mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-black dark:bg-neutral-800 rounded" />
        <div className="h-4 bg-black dark:bg-neutral-800 rounded" />
        <div className="h-4 bg-black dark:bg-neutral-800 rounded" />
      </div>
    </div>
  );
}

export default function AddTuitionModal() {
  const router = useRouter();
  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent className="sm:max-w-[550px] p-0 border-0">
        <Card className="border border-border">
          <CardHeader>
            <CardTitle>Add Student</CardTitle>
          </CardHeader>
          <CardContent>
              <TuitionForm />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
