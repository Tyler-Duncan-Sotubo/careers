import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/context/BookmarkContext";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { formatSource } from "@/utils/formatSource";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";

type Job = {
  id: string;
  companyId: string;
  title: string;
  description: string;
  datePosted: string;
  jobType: string;
  employmentType: string;
  companyName: string;
  companyLogo: string;
  salaryRangeFrom: number;
  salaryRangeTo: number;
};

export default function JobCard({ job }: { job: Job }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();

  return (
    <div className="p-5 border rounded-lg shadow-sm bg-white flex flex-col justify-between h-full">
      <div className="space-y-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 bg-gray-50 p-2 rounded-md">
              <div className="relative w-12 h-12 bg-gray-50 p-2 rounded-md">
                <Image
                  src={job.companyLogo || "/company.png"}
                  alt="Company Logo"
                  fill
                  className="object-contain rounded-md p-1"
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <Link
                href={`/jobs/company-jobs/${job.companyId}`}
                className="text-sm text-blue-500 hover:underline"
              >
                <p className="text-xs font-semibold">{job.companyName}</p>
              </Link>
            </div>
          </div>
          <button onClick={() => toggleBookmark(job.id)}>
            {isBookmarked(job.id) ? (
              <FaBookmark className="w-6 h-6" title="Bookmarked" />
            ) : (
              <FaRegBookmark className="text-muted-foreground w-6 h-6" />
            )}
          </button>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-3 line-clamp-3">
            {job.description}
          </p>
        </div>

        <div className="flex gap-2 mt-2">
          <Badge>{formatSource(job.jobType)}</Badge>
          <Badge variant="outline">{formatSource(job.employmentType)}</Badge>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm font-medium text-gray-800">
          {formatCurrency(job.salaryRangeFrom)} -{" "}
          {formatCurrency(job.salaryRangeTo)}
          <span className="font-normal"> /Year</span>
        </p>
        <Link href={`/jobs/apply/${job.id}`}>
          <Button variant="outline" className="h-10 text-xs px-4 py-1">
            Apply for Job
          </Button>
        </Link>
      </div>
    </div>
  );
}
