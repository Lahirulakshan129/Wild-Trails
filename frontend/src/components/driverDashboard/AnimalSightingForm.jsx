import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { Button } from "../ui/home-ui/button";
import { Input } from "../ui/driverDashboard-ui/input";
import { Textarea } from "../ui/driverDashboard-ui/textarea";
import { Label } from "../ui/driverDashboard-ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/driverDashboard-ui/select";


const token = localStorage.getItem("token");
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
const kumanaBoxes = [
  { minLat: 6.4800, maxLat: 6.5100, minLng: 81.6600, maxLng: 81.7100 },
  { minLat: 6.5100, maxLat: 6.5400, minLng: 81.7000, maxLng: 81.7400 },
  { minLat: 6.5400, maxLat: 6.5700, minLng: 81.6900, maxLng: 81.7700 },
  { minLat: 6.5700, maxLat: 6.6000, minLng: 81.7500, maxLng: 81.8200 },
  { minLat: 6.6000, maxLat: 6.6500, minLng: 81.7200, maxLng: 81.8000 },
  { minLat: 6.6500, maxLat: 6.6900, minLng: 81.7300, maxLng: 81.8600 },
];

const demoCoordinates = [
  { lat: 6.4950, lng: 81.6850 }, // Box 1
  { lat: 6.5250, lng: 81.7200 }, // Box 2
  { lat: 6.5550, lng: 81.7300 }, // Box 3
  { lat: 6.5850, lng: 81.7850 }, // Box 4
  { lat: 6.6250, lng: 81.7600 }, // Box 5
  { lat: 6.6750, lng: 81.7950 }, // Box 6
];

const getLocalDateTimeString = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().slice(0, 16);
};

const AnimalSightingForm = ({ onSubmit }) => {
  const [animalName, setAnimalName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({ lat: 0, lng: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidLocation, setIsValidLocation] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [useDemoLocation, setUseDemoLocation] = useState(false);

  const animalOptions = [
    { value: "Tiger", label: "Tiger" },
    { value: "Sloth Bear", label: "Sloth Bear" },
    { value: "Elephant", label: "Elephant" },
    { value: "Rare Animal", label: "Rare Animal" },
  ];

  const isWithinKumana = (lat, lng) => {
    return kumanaBoxes.some(
      (box) =>
        lat >= box.minLat &&
        lat <= box.maxLat &&
        lng >= box.minLng &&
        lng <= box.maxLng
    );
  };

  const getRandomDemoLocation = () => {
    const randomIndex = Math.floor(Math.random() * demoCoordinates.length);
    return demoCoordinates[randomIndex];
  };

  useEffect(() => {
    setDateTime(getLocalDateTimeString());

    if (useDemoLocation) {
      const demoLoc = getRandomDemoLocation();
      setSelectedLocation(demoLoc);
      setIsValidLocation(true);
      setIsLoadingLocation(false);
      return;
    }

    if (navigator.geolocation) {
      setIsLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setSelectedLocation(newLocation);
          setIsValidLocation(isWithinKumana(newLocation.lat, newLocation.lng));
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setIsLoadingLocation(false);
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
      setIsLoadingLocation(false);
    }
  }, [useDemoLocation]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(getLocalDateTimeString());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!animalName.trim() || !dateTime || !isValidLocation) {
      toast.error("Please fill all required fields.");
      return; 
    }
  
    setIsSubmitting(true);
  
    try {
      const newSighting = {
        animalName: animalName.trim(),
        dateTime: new Date(dateTime).toISOString(),
        notes: notes.trim() || undefined,
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
      };
  
      console.log("Submitting animal sighting to backend:", newSighting);
      console.log("Using token:", token);
  
      const response = await fetch(`${BASE_URL}/api/sightings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSighting),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed with status ${response.status}: ${errorText}`);
      }
  
      if (onSubmit && typeof onSubmit === "function") {
        await onSubmit(newSighting);
      }
  
      setAnimalName("");
      setNotes("");
    } catch (error) {
      console.error("Error submitting sighting:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-3 rounded-lg border border-emerald-100 bg-emerald-50 hover:bg-emerald-50/80 mb-3">
      <div className="flex items-start">
        <div className="w-full">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-emerald-800 text-lg">
              Animal Sighting Report
            </h3>
            <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded bg-emerald-100 text-emerald-800">
              REPORT
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mt-1.5 mb-4">
            Record details of any wildlife sightings during your safari.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="animalName" className="block text-sm font-medium mb-1.5 text-gray-700">
                Animal Species*
              </Label>
              <Select value={animalName} onValueChange={setAnimalName} required>
                <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm">
                  <SelectValue placeholder="Select an animal" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                  {animalOptions.map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className="hover:bg-emerald-50 focus:bg-emerald-50 text-sm"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dateTime" className="block text-sm font-medium mb-1.5 text-gray-700">
                Date & Time*
              </Label>
              <Input
                id="dateTime"
                type="datetime-local"
                value={dateTime}
                readOnly
                className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-gray-700 text-sm"
              />
            </div>

            <div>
              <Label htmlFor="notes" className="block text-sm font-medium mb-1.5 text-gray-700">
                Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Additional observations (behavior, group size, etc.)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="block text-sm font-medium text-gray-700">
                  Location
                </Label>
                <button
                  type="button"
                  onClick={() => setUseDemoLocation(!useDemoLocation)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-gray-600"
                >
                  {useDemoLocation ? "Use Real Location" : "Use Demo Location"}
                </button>
              </div>
              
              {isLoadingLocation ? (
                <div className="flex items-center justify-center h-10 border border-gray-300 rounded-md bg-gray-50">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-emerald-500"></div>
                  <span className="ml-2 text-sm text-gray-600">Getting location...</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className={`w-full border rounded-md px-3 py-2 text-sm ${
                    isValidLocation 
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}>
                    <div className="flex justify-between">
                      <span className="font-medium">Coordinates:</span>
                      <span>
                        {selectedLocation.lat.toFixed(5)}, {selectedLocation.lng.toFixed(5)}
                      </span>
                    </div>
                    <div className="text-xs mt-1">
                      {isValidLocation ? "✅ Within Kumana National Park" : "❌ Outside park boundaries"}
                    </div>
                  </div>
                  {useDemoLocation && (
                    <div className="text-xs text-gray-500 bg-yellow-50 p-1.5 rounded">
                      Using demo location for testing. Click "Use Real Location" to switch back.
                    </div>
                  )}
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !isValidLocation || isLoadingLocation}
              variant="animalSighting"
              className={`w-full mt-2 h-12 text-base font-medium transition-all ${
                isSubmitting ? "bg-emerald-400" : "bg-emerald-600 hover:bg-emerald-700"
              } text-white`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                <span className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                  Submit Sighting
                </span>
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center mt-2">
              * Required fields
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AnimalSightingForm;