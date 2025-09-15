/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import JobCard from "@/components/JobCard";
import SearchBar from "@/components/SearchBar";
import Loading from "@/components/ui/loading";
import Image from "next/image";
import EmptyState from "@/components/ui/empty-state";

const fetchJobs = async (params: Record<string, any>) => {
  const res = await axiosInstance.get("/api/jobs/public", { params });
  return res.data.data;
};

export default function JobBoardLanding() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(handler);
  }, [search]);

  const queryParams = {
    search: debouncedSearch,
    location,
  };

  const {
    data: jobs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["jobs", queryParams],
    queryFn: () => fetchJobs(queryParams),
  });

  return (
    <main className="min-h-screen flex flex-col items-center mb-24">
      {/* Hero Section Grid */}
      <section className="w-full max-w-7xl flex flex-col-reverse px-4 md:grid grid-cols-1 md:grid-cols-2 items-center gap-12 ">
        {/* Left: Headline and Search */}
        <div className="w-full">
          <h2 className="text-3xl sm:text-3xl font-extrabold mb-4 text-left space-y-3">
            Your Career. <br />
          </h2>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 text-left space-y-3">
            Your Centa<span className="text-monzo-error">HR</span> Advantage.
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-left">
            Discover roles at forward-thinking companies using centaHR.{" "}
            <br className="hidden sm:block" />
            Empower your growth. Simplify your journey. Powered by our trusted
            HRIS platform.
          </p>
          <SearchBar
            search={search}
            setSearch={setSearch}
            location={location}
            setLocation={setLocation}
          />
        </div>
        {/* Right: Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="https://res.cloudinary.com/dw1ltt9iz/image/upload/v1757929811/slider_gefeok.png"
            alt="Find your next job"
            width={450}
            height={300}
            priority
          />
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="w-full max-w-7xl px-4">
        <h2 className="text-2xl font-bold mb-6">Featured Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <Loading />
          ) : isError || jobs.length === 0 ? (
            <div className="flex justify-center col-span-full mt-10">
              <EmptyState
                title="No jobs available"
                description="Please try again later."
                image="https://res.cloudinary.com/dw1ltt9iz/image/upload/v1757585356/job_ruuqp1.svg"
              />
            </div>
          ) : jobs.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center">
              No featured jobs found.
            </p>
          ) : (
            jobs
              .slice(0, 6)
              .map((job: any) => <JobCard key={job.id} job={job} />)
          )}
        </div>
      </section>
    </main>
  );
}
