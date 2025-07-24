import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { nigeriaLocations } from "@/data/locations";

export function LocationSelector({
  location,
  setLocation,
}: {
  location: string;
  setLocation: (val: string) => void;
}) {
  const [selectedState, setSelectedState] = useState<string>("");

  const states = nigeriaLocations.map((entry) => entry.name);
  const cities =
    nigeriaLocations.find((entry) => entry.name === selectedState)?.cities ||
    [];

  return (
    <div className="flex gap-4 items-center w-full">
      {/* State Select */}
      <Select value={selectedState} onValueChange={setSelectedState}>
        <SelectTrigger className="w-32 h-12">
          <SelectValue placeholder="Select State" />
        </SelectTrigger>
        <SelectContent>
          {states.map((state) => (
            <SelectItem key={state} value={state}>
              {state}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* City Select */}
      <Select
        value={location}
        onValueChange={setLocation}
        disabled={!selectedState}
      >
        <SelectTrigger className="w-48 h-12">
          <SelectValue placeholder="Select City" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
