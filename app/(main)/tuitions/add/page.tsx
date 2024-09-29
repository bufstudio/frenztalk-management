"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowBackIosNew } from "@mui/icons-material";
import TuitionForm from "../components/tuitionForm";

function AddTuitionPage() {
  const router = useRouter();
  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          router.back();
        }}
        className="flex items-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors mb-4"
      >
        <ArrowBackIosNew className="h-5 w-5 mr-2" />
        <h1 className="text-lg font-semibold">Add Tuition</h1>
      </button>
      <TuitionForm />
    </>
  );
}

export default AddTuitionPage;
