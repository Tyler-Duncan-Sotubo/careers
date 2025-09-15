"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import JobCard from "@/components/JobCard";
import SearchBar from "@/components/SearchBar";
import Loading from "@/components/ui/loading";
import Image from "next/image";
import EmptyState from "@/components/ui/empty-state";

const fetchJobs = async (params: Record<string, any>) => {
  const res = await axiosInstance.get("/api/jobs/company-jobs", { params });
  return res.data.data;
};

export default function CompanyJobsPage() {
  const params = useParams();
  const companyId = params?.id as string;

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const queryParams = {
    companyId,
    search,
    location,
  };

  const {
    data: jobs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["company-jobs", queryParams],
    queryFn: () => fetchJobs(queryParams),
    enabled: !!companyId,
  });

  const companyName = jobs[0]?.companyName;
  const companyLogo = jobs[0]?.companyLogo;

  if (isLoading) return <Loading />;
  if (isError || jobs.length === 0)
    return (
      <div className="flex justify-center col-span-full mt-20">
        <EmptyState
          title="No jobs available"
          description="Please try again later."
          image="https://res.cloudinary.com/dw1ltt9iz/image/upload/v1757585356/job_ruuqp1.svg"
        />
      </div>
    );

  return (
    <div className="min-h-screen p-4 sm:p-10 font-sans space-y-6">
      {companyName && (
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 relative bg-white rounded-md border shadow">
            <Image
              src={
                companyLogo ||
                "https://res.cloudinary.com/dw1ltt9iz/image/upload/v1757929805/company_pd8dc7.png"
              }
              alt={`${companyName} Logo`}
              fill
              className="object-contain p-2"
            />
          </div>
          <h2 className="text-2xl font-semibold">{companyName}</h2>
        </div>
      )}

      <SearchBar
        search={search}
        setSearch={setSearch}
        location={location}
        setLocation={setLocation}
      />

      <div className="grid grid-cols-1 gap-6">
        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs found for this company.</p>
        ) : (
          jobs.map((job: any) => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
}
