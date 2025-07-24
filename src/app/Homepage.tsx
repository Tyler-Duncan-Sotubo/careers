/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import JobCard from "@/components/JobCard";
import FiltersPanel from "@/components/FiltersPanel";
import SearchBar from "@/components/SearchBar";
import Loading from "@/components/ui/loading";

const fetchJobs = async (params: Record<string, any>) => {
  const res = await axiosInstance.get("/api/jobs/public", { params });
  return res.data.data;
};

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<string[]>([]);
  // Your controlled state
  const [salary, setSalary] = useState<[number, number]>([0, 2000000]); // real values

  // Debounced value
  const [debouncedSalary, setDebouncedSalary] =
    useState<[number, number]>(salary);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSalary(salary);
    }, 500); // 500ms delay

    return () => clearTimeout(handler); // Cleanup on salary change
  }, [salary]);

  const toggleFilter = (
    value: string,
    list: string[],
    setter: (values: string[]) => void
  ) => {
    setter(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
  };

  const DEFAULT_SALARY_MIN = 5000;
  const DEFAULT_SALARY_MAX = 1000000;

  const shouldFilterSalary =
    debouncedSalary[0] !== DEFAULT_SALARY_MIN ||
    debouncedSalary[1] !== DEFAULT_SALARY_MAX;

  const queryParams = {
    search,
    location,
    jobType: jobTypes,
    employmentType: employmentTypes,
    experienceLevel,
    ...(shouldFilterSalary && {
      salaryMin: debouncedSalary[0],
      salaryMax: debouncedSalary[1],
    }),
  };

  const {
    data: jobs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["jobs", queryParams],
    queryFn: () => fetchJobs(queryParams),
  });

  if (isLoading) return <Loading />;
  if (isError) return <p>Error loading jobs</p>;

  return (
    <div className="flex flex-col-reverse md:grid md:grid-cols-4 gap-8 min-h-screen p-4 sm:p-10 font-sans mb-10 sm:mb-0">
      <FiltersPanel
        jobTypes={jobTypes}
        setJobTypes={setJobTypes}
        experiences={experienceLevel}
        setExperiences={setExperienceLevel}
        employmentTypes={employmentTypes}
        setEmploymentTypes={setEmploymentTypes}
        salary={salary}
        setSalary={setSalary}
        toggleFilter={toggleFilter}
      />

      <div className="md:col-span-3 space-y-8">
        <SearchBar
          search={search}
          setSearch={setSearch}
          location={location}
          setLocation={setLocation}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {jobs.length === 0 ? (
            <p className="text-gray-500 col-span-full">No jobs found.</p>
          ) : (
            jobs.map((job: any) => <JobCard key={job.id} job={job} />)
          )}
        </div>
      </div>
    </div>
  );
}
