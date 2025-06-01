import { useState } from "react";
import { Button } from "../ui/driverDashboard-ui/button";
import { Input } from "../ui/driverDashboard-ui/input";
import { Textarea } from "../ui/driverDashboard-ui/textarea";
import { Label } from "../ui/driverDashboard-ui/label";

const AnimalSightingForm = ({ selectedLocation, onSubmit }) => {
  const [animalName, setAnimalName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-serif text-safari-text font-semibold">Report Animal Sighting</h2>

      <div className="space-y-2">
        <Label htmlFor="animalName" className="text-safari-text">
          Animal Name*
        </Label>
        <Input
          id="animalName"
          type="text"
          placeholder="e.g. Elephant, Leopard"
          value={animalName}
          onChange={(e) => setAnimalName(e.target.value)}
          required
          className="border-safari-primary/30 focus:border-safari-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateTime" className="text-safari-text">
          Date & Time*
        </Label>
        <Input
          id="dateTime"
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          required
          className="border-safari-primary/30 focus:border-safari-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="text-safari-text">
          Notes
        </Label>
        <Textarea
          id="notes"
          placeholder="Additional observations"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="resize-none h-20 border-safari-primary/30 focus:border-safari-primary"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-safari-text">Location</Label>
        <div className="p-2 bg-gray-100 rounded-md text-sm">
          <p>Latitude: {selectedLocation.lat.toFixed(5)}</p>
          <p>Longitude: {selectedLocation.lng.toFixed(5)}</p>
          <p className="text-xs text-gray-500 mt-1">Click on map to change location</p>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-safari-primary hover:bg-safari-primary/90 text-white"
      >
        {isSubmitting ? "Submitting..." : "Submit Sighting"}
      </Button>
    </form>
  );
};

export default AnimalSightingForm;
