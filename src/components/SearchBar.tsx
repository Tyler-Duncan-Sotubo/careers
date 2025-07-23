import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { LocationSelector } from "./LocationSelector";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
}

export default function SearchBar({
  search,
  setSearch,
  location,
  setLocation,
}: SearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
      <LocationSelector location={location} setLocation={setLocation} />

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search for jobs..."
          className="h-12 w-60 sm:w-[540px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<FaMagnifyingGlass className="h-5 w-5 text-gray-500" />}
        />
        <Button className="w-[20%] h-12">Search</Button>
      </div>
    </div>
  );
}
