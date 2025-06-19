import { useEffect, useState } from "react";
import { Button } from "../ui/driverDashboard-ui/button";
import { Input } from "../ui/driverDashboard-ui/input";
import { Textarea } from "../ui/driverDashboard-ui/textarea";
import { Label } from "../ui/driverDashboard-ui/label";

const AnimalSightingForm = ({ onSubmit }) => {
  const [animalName, setAnimalName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({ lat: 0, lng: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Request user's current location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSelectedLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!animalName.trim() || !dateTime) {
      console.log("Form validation failed: Missing required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const newSighting = {
        animalName: animalName.trim(),
        dateTime: new Date(dateTime),
        notes: notes.trim() || undefined,
        location: selectedLocation,
      };

      console.log("Submitting animal sighting:", newSighting);
      await onSubmit(newSighting);

      // Reset form
      setAnimalName("");
      setDateTime("");
      setNotes("");
    } catch (error) {
      console.error("Error submitting sighting:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-serif font-semibold text-[#264653] mb-4">
        Record Animal Sighting
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="animalName" className="block text-sm font-medium mb-1">
            Animal Species*
          </Label>
          <Input
            id="animalName"
            type="text"
            placeholder="e.g., Elephant, Leopard"
            value={animalName}
            onChange={(e) => setAnimalName(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
          />
        </div>

        <div>
          <Label htmlFor="dateTime" className="block text-sm font-medium mb-1">
            Date & Time*
          </Label>
          <Input
            id="dateTime"
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
          />
        </div>

        <div>
          <Label htmlFor="notes" className="block text-sm font-medium mb-1">
            Notes
          </Label>
          <Textarea
            id="notes"
            placeholder="Additional observations..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 h-20 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
          />
        </div>

        <div>
          <Label className="block text-sm font-medium mb-1">Location</Label>
          <input
            type="text"
            readOnly
            value={`${selectedLocation.lat.toFixed(5)}, ${selectedLocation.lng.toFixed(5)}`}
            className="w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50"
          />
          <p className="text-xs text-gray-500 mt-1">This uses your current browser location</p>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-[#2A9D8F] hover:bg-[#2A9D8F]/90 text-white font-medium rounded-md transition-colors"
        >
          {isSubmitting ? "Submitting..." : "Submit Sighting"}
        </Button>
      </form>
    </div>
  );
};

export default AnimalSightingForm;
