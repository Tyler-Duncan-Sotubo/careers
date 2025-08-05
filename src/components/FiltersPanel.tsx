import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

// For clarity and mapping
const jobTypeOptions = [
  { value: "onsite", label: "On-site" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
] as const;

const employmentTypeOptions = [
  { value: "permanent", label: "Permanent" },
  { value: "temporary", label: "Temporary" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "freelance", label: "Freelance" },
  { value: "part_time", label: "Part-time" },
  { value: "full_time", label: "Full-time" },
] as const;

const experienceOptions = ["junior", "mid", "senior", "lead"] as const;

const formatSalary = (value: number) => {
  return value >= 1000000
    ? `${(value / 1000000).toFixed(1)}M`
    : `${value / 1000}K`;
};

export default function FiltersPanel({
  jobTypes,
  setJobTypes,
  experiences,
  setExperiences,
  employmentTypes,
  setEmploymentTypes,
  salary,
  setSalary,
  toggleFilter,
}: {
  jobTypes: string[];
  setJobTypes: (types: string[]) => void;
  experiences: string[];
  setExperiences: (experiences: string[]) => void;
  employmentTypes: string[];
  setEmploymentTypes: (types: string[]) => void;
  salary: [number, number];
  setSalary: (value: [number, number]) => void;
  toggleFilter: (
    value: string,
    current: string[],
    setter: (values: string[]) => void
  ) => void;
}) {
  return (
    <div className="md:col-span-1 w-full md:sticky top-32 self-start border-2 shadow-sm rounded-xl max-h-[90vh] overflow-auto p-6 space-y-10">
      <div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold mb-4">Filters</p>
        </div>

        <Separator className="mb-4" />

        {/* Job Type */}
        <Label className="mb-3 block text-md font-semibold">Job Type</Label>
        <div className="grid grid-cols-2 gap-2">
          {jobTypeOptions.map(({ value, label }) => (
            <div className="flex items-center gap-2" key={value}>
              <Checkbox
                id={`jobType-${value}`}
                checked={jobTypes.includes(value)}
                onCheckedChange={() =>
                  toggleFilter(value, jobTypes, setJobTypes)
                }
              />
              <Label htmlFor={`jobType-${value}`}>{label}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <Label className="mb-3 block text-md font-semibold">Experience</Label>
        <div className="grid grid-cols-2 gap-2">
          {experienceOptions.map((level) => (
            <div className="flex items-center gap-2" key={level}>
              <Checkbox
                id={`experience-${level}`}
                checked={experiences.includes(level)}
                onCheckedChange={() =>
                  toggleFilter(level, experiences, setExperiences)
                }
              />
              <Label htmlFor={`experience-${level}`}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Employment Type */}
      <div>
        <Label className="mb-3 block text-md font-semibold">
          Employment Type
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {employmentTypeOptions.map(({ value, label }) => (
            <div className="flex items-center gap-2" key={value}>
              <Checkbox
                id={`employmentType-${value}`}
                checked={employmentTypes.includes(value)}
                onCheckedChange={() =>
                  toggleFilter(value, employmentTypes, setEmploymentTypes)
                }
              />
              <Label htmlFor={`employmentType-${value}`}>{label}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Salary Range */}
      <div>
        <Label className="mb-3 block text-md font-semibold">Salary Range</Label>
        <Slider
          value={salary}
          onValueChange={setSalary}
          min={20000} // 👈 minimum salary is now 20K
          max={10000000} // 👈 adjust max as needed
          step={5000}
        />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>{formatSalary(salary[0])}</span>
          <span>{formatSalary(salary[1])}</span>
        </div>
      </div>
    </div>
  );
}
