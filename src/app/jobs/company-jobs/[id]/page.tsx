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
  if (isError) return <p>Error loading company jobs.</p>;

  return (
    <div className="min-h-screen p-4 sm:p-10 font-sans space-y-6">
      {companyName && (
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 relative bg-white rounded-md border shadow">
            <Image
              src={companyLogo || "/company.png"}
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
