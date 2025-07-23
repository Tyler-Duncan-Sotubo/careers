"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-white dark:bg-background">
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h1 className="text-2xl font-semibold mb-2">Application Submitted</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Thank you for applying! We’ve received your application and will be in
        touch if you’re shortlisted.
      </p>

      <Link href="/jobs">
        <button className="bg-monzo-brand text-white px-6 py-2 rounded-md hover:bg-monzo-brandDark transition">
          View More Jobs
        </button>
      </Link>
    </div>
  );
}
