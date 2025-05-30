import { useEffect, useRef, useState, useMemo } from "react";
import { Card } from "../ui/driverDashboard-ui/card";
import PropTypes from "prop-types";
import SightingForm from "./AnimalSightingForm";

// Marker pool for recycling markers
const MARKER_POOL_SIZE = 20;
let markerPool = [];

const MapSection = ({ selectedLocation, setSelectedLocation }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [sightings, setSightings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    animalType: 'all',
    timeRange: '10min'
  });

  // Get marker from pool or create new one
  const getMarker = () => {
    if (markerPool.length > 0) {
      return markerPool.pop();
    }
    return new window.google.maps.marker.AdvancedMarkerElement();
  };

  // Return marker to pool
  const releaseMarker = (marker) => {
    marker.map = null;
    markerPool.push(marker);
  };

  // Dummy data
  const dummySightings = useMemo(() => [
    {
      id: '1',
      animal_type: 'Elephant',
      location_lat: 6.536939,
      location_lng: 81.707786,
      timestamp: new Date().toISOString(),
      image_url: null,
      reported_by: 'driver-1',
      notes: 'Large herd near waterhole'
    },
    {
      id: '2',
      animal_type: 'Leopard',
      location_lat: 6.473,
      location_lng: 81.675,
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      image_url: null,
      reported_by: 'driver-2',
      notes: 'Resting on a tree'
    },
    {
      id: '3',
      animal_type: 'Bear',
      location_lat: 6.469,
      location_lng: 81.675,
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      image_url: null,
      reported_by: 'driver-3',
      notes: 'Crossing the road'
    }
  ], []);

  // Load Google Maps script
  useEffect(() => {
    if (window.google?.maps?.Map) {
      setMapLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&loading=async&libraries=marker&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onerror = () => setApiError("Failed to load Google Maps API");

    window.initMap = () => setMapLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      delete window.initMap;
    };
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapLoaded || !selectedLocation) return;

    try {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: selectedLocation.lat,
          lng: selectedLocation.lng
        },
        zoom: 12,
        mapId: "6bbf28f0a2a779649aa95dc3",
        disableDefaultUI: true,
        gestureHandling: "greedy"
      });

      return () => {
        if (mapInstanceRef.current) {
          window.google.maps.event.clearInstanceListeners(mapInstanceRef.current);
        }
      };
    } catch (error) {
      console.error("Error initializing map:", error);
      setApiError("Error initializing map");
    }
  }, [mapLoaded, selectedLocation]);

  // Load dummy data with time-based filtering
  useEffect(() => {
    const filterSightings = () => {
      const now = new Date();
      const tenMinutesAgo = new Date(now.getTime() - 10 * 60000);
      return dummySightings.filter(s => new Date(s.timestamp) >= tenMinutesAgo);
    };

    setSightings(filterSightings());
    
    const interval = setInterval(() => {
      setSightings(filterSightings());
    }, 30000);

    return () => clearInterval(interval);
  }, [dummySightings]);

  // Get filtered sightings
  const filteredSightings = useMemo(() => {
    const now = new Date();
    const tenMinutesAgo = new Date(now.getTime() - 10 * 60000);

    return sightings.filter(sighting => {
      const isRecent = new Date(sighting.timestamp) >= tenMinutesAgo;
      const matchesAnimalType = filters.animalType === 'all' || 
        sighting.animal_type.toLowerCase() === filters.animalType.toLowerCase();
      
      return isRecent && matchesAnimalType;
    });
  }, [sightings, filters]);

  // Update markers with optimized approach
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return;

    try {
      // First release all markers back to pool
      markerPool.forEach(releaseMarker);
      markerPool = [];

      // Create optimized markers
      filteredSightings.forEach(sighting => {
        const marker = getMarker();
        
        const pinWrapper = document.createElement("div");
        pinWrapper.innerHTML = `
          <div style="position:relative;width:30px;height:40px">
            <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 0C6.7 0 0 6.7 0 15c0 8.2 15 27 15 27s15-18.8 15-27C30 6.7 23.3 0 15 0z" fill="${getAnimalColor(sighting.animal_type)}"/>
            </svg>
            <div style="position:absolute;top:5px;left:5px;width:20px;height:20px;border-radius:50%;border:2px solid white;background:white;display:flex;align-items:center;justify-content:center">
              ${getAnimalInitial(sighting.animal_type)}
            </div>
          </div>
        `;

        marker.position = { lat: sighting.location_lat, lng: sighting.location_lng };
        marker.map = mapInstanceRef.current;
        marker.content = pinWrapper;
        marker.title = `${sighting.animal_type} - ${new Date(sighting.timestamp).toLocaleString()}`;

        markerPool.push(marker);
      });

    } catch (error) {
      console.error("Error updating markers:", error);
    }

    return () => {
      // Cleanup markers on unmount
      markerPool.forEach(marker => {
        marker.map = null;
        if (marker.content) {
          marker.content.remove();
        }
      });
      markerPool = [];
    };
  }, [mapLoaded, filteredSightings]);

  // Helper functions
  const getAnimalColor = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes("elephant")) return "#2A9D8F";
    if (lower.includes("leopard")) return "#E9C46A";
    if (lower.includes("bear")) return "#264653";
    return "#E76F51";
  };

  const getAnimalInitial = (name) => name.charAt(0).toUpperCase();

  if (apiError) {
    return (
      <Card className="h-full w-full overflow-hidden flex items-center justify-center">
        <div className="text-red-500">{apiError}</div>
      </Card>
    );
  }

  return (
    <Card className="h-full w-full overflow-hidden relative">
      <div ref={mapRef} className="h-full w-full" />
      
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div>Loading map...</div>
        </div>
      )}

      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <div className="bg-white p-2 rounded shadow">
          <label className="block text-sm font-medium mb-1">Animal Type</label>
          <select 
            className="w-full p-1 border rounded"
            value={filters.animalType}
            onChange={(e) => setFilters({...filters, animalType: e.target.value})}
          >
            <option value="all">All Animals</option>
            <option value="elephant">Elephant</option>
            <option value="leopard">Leopard</option>
            <option value="bear">Bear</option>
          </select>
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          onClick={() => setShowForm(true)}
        >
          Report Sighting
        </button>
      </div>

      {showForm && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-w-md w-full">
            <SightingForm
              location={selectedLocation}
              onSubmit={(data) => {
                const newSighting = {
                  id: `dummy-${Math.random().toString(36).substr(2, 9)}`,
                  ...data,
                  reported_by: 'current-user',
                  timestamp: new Date().toISOString()
                };
                setSightings(prev => [...prev, newSighting]);
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </Card>
  );
};

MapSection.propTypes = {
  selectedLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  setSelectedLocation: PropTypes.func.isRequired,
};

export default MapSection;