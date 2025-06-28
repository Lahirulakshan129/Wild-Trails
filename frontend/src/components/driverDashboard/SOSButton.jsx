"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/home-ui/button";
import { SOSConfirmationModal } from "./SOSConfirmationModal";

const kumanaBoxes = [
  { minLat: 6.4800, maxLat: 6.5100, minLng: 81.6600, maxLng: 81.7100 },
  { minLat: 6.5100, maxLat: 6.5400, minLng: 81.7000, maxLng: 81.7400 },
  { minLat: 6.5400, maxLat: 6.5700, minLng: 81.6900, maxLng: 81.7700 },
  { minLat: 6.5700, maxLat: 6.6000, minLng: 81.7500, maxLng: 81.8200 },
  { minLat: 6.6000, maxLat: 6.6500, minLng: 81.7200, maxLng: 81.8000 },
  { minLat: 6.6500, maxLat: 6.6900, minLng: 81.7300, maxLng: 81.8600 },
];

const demoCoordinates = [
  { lat: 6.4950, lng: 81.6850 },
  { lat: 6.5250, lng: 81.7200 },
  { lat: 6.5550, lng: 81.7300 },
  { lat: 6.5850, lng: 81.7850 },
  { lat: 6.6250, lng: 81.7600 },
  { lat: 6.6750, lng: 81.7950 },
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

const SOSButton = ({ onSOS }) => {
  const [isTriggering, setIsTriggering] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isValidLocation, setIsValidLocation] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [useDemoLocation, setUseDemoLocation] = useState(false);

  useEffect(() => {
    if (useDemoLocation) {
      const demoLoc = getRandomDemoLocation();
      setCurrentLocation(demoLoc);
      setIsValidLocation(isWithinKumana(demoLoc.lat, demoLoc.lng));
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
          setCurrentLocation(newLocation);
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

  const handleSOSClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    if (!isValidLocation) {
      console.log("Cannot send SOS - outside park boundaries");
      return;
    }

    setShowConfirmation(false);
    setIsTriggering(true);
    setPulseAnimation(true);

    try {
      console.log("Triggering SOS alert with location:", currentLocation);
      await onSOS(currentLocation);
    } catch (error) {
      console.error("Error sending SOS:", error);
    } finally {
      setIsTriggering(false);
      setTimeout(() => setPulseAnimation(false), 2000);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const toggleDemoMode = () => {
    setUseDemoLocation(prev => !prev);
  };

  return (
    <div className="p-3 rounded-lg border border-red-100 bg-red-50 hover:bg-red-50/80 mb-3">
      <div className="flex items-start">
        <div className="text-2xl mr-2">🚨</div>
        <div className="w-full">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-red-800 text-lg">
              Emergency Alert System
            </h3>
            <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded bg-red-100 text-red-800">
              EMERGENCY
            </span>
          </div>

          <p className="text-sm text-gray-600 mt-1.5">
            Press the button below to send your current location to all nearby rangers and emergency services.
          </p>

          <div className="flex justify-between items-center mt-2 mb-1">
            <p className="text-xs font-medium text-gray-700">
              Current Location Mode:
            </p>
            <button
              type="button"
              onClick={toggleDemoMode}
              className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-gray-600"
            >
              {useDemoLocation ? "Use Real GPS" : "Use Test GPS"}
            </button>
          </div>

          <Button
            onClick={handleSOSClick}
            disabled={isTriggering || isLoadingLocation}
            variant="emergency"
            className={`w-full mt-1 h-12 text-lg font-bold transition-all ${
              pulseAnimation ? "animate-pulse" : ""
            }`}
          >
            {isLoadingLocation
              ? "GETTING LOCATION..."
              : isTriggering
              ? "SENDING SOS..."
              : "🚨 SEND SOS"}
          </Button>

          {isLoadingLocation ? (
            <p className="mt-2 text-xs text-gray-500 text-center">
              Determining your location...
            </p>
          ) : (
            <p className="mt-2 text-xs text-center">
              {isValidLocation ? (
                <span className="text-green-600">
                  ✅ You are within Kumana National Park
                </span>
              ) : (
                <span className="text-red-600">
                  ❌ Outside park boundaries - SOS unavailable
                </span>
              )}
            </p>
          )}

          {useDemoLocation && (
            <p className="mt-1 text-[11px] text-yellow-700 bg-yellow-100 px-2 py-1 rounded text-center">
              Test mode active. Coordinates are randomly generated from demo list.
            </p>
          )}

          <p className="mt-2 text-xs text-gray-500 text-center">
            Use only in genuine emergency situations
          </p>
        </div>
      </div>

      <SOSConfirmationModal
        isOpen={showConfirmation}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        locationStatus={{
          coordinates: currentLocation
            ? `${currentLocation.lat.toFixed(5)}, ${currentLocation.lng.toFixed(5)}`
            : "Unknown",
          isValid: isValidLocation,
          isLoading: isLoadingLocation,
        }}
      />
    </div>
  );
};

export default SOSButton;
