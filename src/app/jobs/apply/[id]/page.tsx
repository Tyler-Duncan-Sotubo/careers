/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ApplicationForm } from "../../_components/ApplicationForm";
import { axiosInstance, isAxiosError } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/ui/loading";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaChevronCircleLeft } from "react-icons/fa";
import JobDetails from "../../_components/JobDetails";
import { useRouter } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ApplyPage({ params }: PageProps) {
  const id = params.id;
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const submitApplication = useCreateMutation({
    endpoint: "api/applications/submit",
    successMessage: "Application submitted successfully",
    onSuccess: () => {
      setError(null);
      router.push("/jobs/success");
    },
  });

  const fetchJob = async () => {
    try {
      const res = await axiosInstance.get(`/api/jobs/public/job`, {
        params: { id: params.id },
      });
      return res.data.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return [];
      }
    }
  };

  const fetchForm = async () => {
    try {
      const res = await axiosInstance.get(`/api/jobs/${id}/application-form`);
      return res.data.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return [];
      }
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["application-form", params.id],
    queryFn: () => fetchForm(),
    refetchOnMount: true,
  });

  const {
    data: jobData,
    isLoading: isJobLoading,
    isError: isJobError,
  } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJob(),
    refetchOnMount: true,
  });

  if (isLoading || isJobLoading) return <Loading />;
  if (isError || isJobError) return <p>Error loading data</p>;

  function mapFormToDto({
    values,
    fields,
    questions,
    jobId,
    applicationSource,
    candidateSource,
  }: {
    values: Record<string, any>;
    fields: any[];
    questions: any[];
    jobId: string;
    applicationSource: string;
    candidateSource: string;
  }) {
    const fieldResponses = fields.map((field) => {
      const rawValue = values[field.id];

      const value =
        field.fieldType === "file"
          ? rawValue?.base64 ?? "" // ✅ send only base64
          : String(rawValue ?? "");

      return {
        label: field.label,
        fieldType: field.fieldType,
        value,
      };
    });

    const questionResponses = questions.map((q) => ({
      question: q.question,
      answer: String(values[q.id] ?? ""),
    }));

    return {
      jobId,
      applicationSource,
      candidateSource,
      fieldResponses,
      questionResponses,
    };
  }

  const handleApplicationSubmit = async (values: any) => {
    const dto = mapFormToDto({
      values,
      fields: data.fields,
      questions: data.questions,
      jobId: id, // pass from props/context
      applicationSource: "career_page", // or dynamic
      candidateSource: "referral", // or dynamic
    });
    await submitApplication(dto, setError);
  };

  return (
    <div className="pb-10 md:px-10 px-4 space-y-6">
      <Link href="/jobs">
        <Button variant={"link"} className="px-0 text-md">
          <FaChevronCircleLeft size={30} />
          Back to Jobs
        </Button>
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-6 pr-4 sm:border-r sm:pr-6">
          <JobDetails job={jobData} />
        </div>

        <div className="space-y-6 sm:pl-6">
          <ApplicationForm
            data={data}
            onSubmit={handleApplicationSubmit}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
