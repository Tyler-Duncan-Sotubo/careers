/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useBookmarks } from "@/context/BookmarkContext";
import JobCard from "@/components/JobCard";
import Loading from "@/components/ui/loading";

const fetchJobs = async () => {
  const res = await axiosInstance.get("/api/jobs/public");
  return res.data.data;
};

export default function BookmarkedJobsPage() {
  const { bookmarks } = useBookmarks(); // assuming it's an array of job IDs
  const {
    data: jobs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["jobs"], // No search params, get all jobs
    queryFn: fetchJobs,
  });

  // Filter jobs based on bookmarks
  const bookmarkedJobs = jobs.filter((job: { id: string }) =>
    bookmarks.includes(job.id)
  );

  return (
    <main className="min-h-screen px-4 py-12">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 px-16">
        Bookmarked Jobs
      </h1>
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <p className="text-red-500">Error loading jobs.</p>
        ) : bookmarkedJobs.length === 0 ? (
          <p className="text-gray-500">You have not bookmarked any jobs yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedJobs.map((job: any) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
