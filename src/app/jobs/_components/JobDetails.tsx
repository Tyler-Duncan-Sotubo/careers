"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Job } from "@/types/job.type";
import { formatSource } from "@/utils/formatSource";

export default function JobDetails({ job }: { job: Job }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <div className="text-sm text-gray-600">
        {job.city}, {job.state}, {job.country}
      </div>

      <div className="flex flex-wrap gap-2 text-sm mt-2">
        {job.jobType && (
          <Badge variant="outline">{formatSource(job.jobType)}</Badge>
        )}
        {job.employmentType && (
          <Badge variant="outline">{formatSource(job.employmentType)}</Badge>
        )}
        {job.experienceLevel && (
          <Badge variant="outline">{formatSource(job.experienceLevel)}</Badge>
        )}
        {job.qualification && (
          <Badge variant="outline">
            {formatSource(job.qualification)} Degree
          </Badge>
        )}
      </div>

      <Separator />

      <div className="text-sm text-gray-600">
        <p>
          Salary:{" "}
          <strong>
            {job.currency} {job.salaryRangeFrom.toLocaleString()} -{" "}
            {job.salaryRangeTo.toLocaleString()}
          </strong>
        </p>
        <p>Application Deadline: {new Date(job.deadlineDate).toDateString()}</p>
      </div>

      <Separator />

      <section>
        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <p className="text-gray-700">{job.description}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {job.responsibilities.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Requirements</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {job.requirements.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Benefits</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {job.benefits.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
