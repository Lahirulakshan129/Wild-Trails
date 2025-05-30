"use client";

import { useState, useEffect } from "react";
import MapSection from "./MapSection";
import AnimalSightingForm from "./AnimalSightingForm";
import SOSButton from "./SOSButton";
import RecentSightingsList from "./RecentSightingsList";
import { Card } from "../ui/card";

export type Location = {
  lat: number;
  lng: number;
};

export type AnimalSighting = {
  id: string;
  animalName: string;
  dateTime: Date;
  notes?: string;
  location: Location;
};

const DriverDashboard = () => {
  // State for selected location on map
  const [selectedLocation, setSelectedLocation] = useState<Location>({
    lat: 6.4833,
    lng: 81.6833, // Default to Kumana Park coordinates
  });

  // Mock state for recent sightings (would come from API in real app)
  const [recentSightings, setRecentSightings] = useState<AnimalSighting[]>([
    {
      id: "1",
      animalName: "Elephant",
      dateTime: new Date(2025, 4, 24, 9, 30),
      notes: "Herd of 5 with a baby",
      location: { lat: 6.4845, lng: 81.6821 },
    },
    {
      id: "2",
      animalName: "Leopard",
      dateTime: new Date(2025, 4, 24, 11, 15),
      notes: "Spotted on a tree",
      location: { lat: 6.4872, lng: 81.6799 },
    },
    {
      id: "3",
      animalName: "Sloth Bear",
      dateTime: new Date(2025, 4, 23, 16, 0),
      notes: "Foraging near watering hole",
      location: { lat: 6.4812, lng: 81.6854 },
    },
  ]);

  // Handle form submission for new animal sighting
  const handleSubmitSighting = (sighting: Omit<AnimalSighting, "id">) => {
    // This would be an API call in a real app
    console.log("Submitting new sighting:", sighting);
    
    const newSighting: AnimalSighting = {
      ...sighting,
      id: Math.random().toString(36).substring(2, 9), // Simple random ID
    };
    
    setRecentSightings([newSighting, ...recentSightings]);
    return Promise.resolve(newSighting);
  };

  // Handle SOS button click
  const handleSOS = () => {
    // This would be an API call in a real app
    console.log("SOS triggered at location:", selectedLocation);
    return Promise.resolve({ location: selectedLocation, timestamp: new Date() });
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden">
      {/* Map Section (full width on mobile, 2/3 width on desktop) */}
      <div className="h-[50vh] lg:h-full lg:w-2/3 relative">
        <MapSection 
          selectedLocation={selectedLocation} 
          setSelectedLocation={setSelectedLocation}
          sightings={recentSightings}
        />
      </div>

      {/* Sidebar Section (full width on mobile, 1/3 width on desktop) */}
      <div className="h-[50vh] lg:h-full lg:w-1/3 p-4 bg-safari-background overflow-y-auto">
        <div className="flex flex-col space-y-4 h-full">
          <h1 className="text-3xl font-serif text-safari-text font-bold">Kumana TrailMate</h1>
          
          {/* Animal Sighting Form */}
          <Card className="p-4 shadow-md bg-white">
            <AnimalSightingForm 
              selectedLocation={selectedLocation} 
              onSubmit={handleSubmitSighting} 
            />
          </Card>
          
          {/* SOS Button */}
          <Card className="p-4 shadow-md bg-white">
            <SOSButton onSOS={handleSOS} />
          </Card>
          
          {/* Recent Sightings List */}
          <Card className="p-4 shadow-md bg-white flex-grow overflow-hidden">
            <RecentSightingsList sightings={recentSightings} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
