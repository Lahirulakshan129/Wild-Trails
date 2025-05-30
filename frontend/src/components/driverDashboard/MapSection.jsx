import { useEffect, useRef, useState } from "react";
import { Card } from "../ui/driverDashboard-ui/card";
import PropTypes from "prop-types";
import SightingForm from "./AnimalSightingForm"; // Component for adding sightings

const MapSection = ({ selectedLocation, setSelectedLocation }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [sightings, setSightings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    animalType: 'all',
    timeRange: '10min'
  });
  const getAnimalIconUrl = (animalType) => {
    const lower = animalType.toLowerCase();
    const base = "public/animal-icons"; // Put icons in `public/animal-icons` folder
  
    switch (lower) {
      case "elephant":
        return `${base}/elephant.png`;
      case "leopard":
        return `${base}/leopard.png`;
      case "deer":
        return `${base}/deer.png`;
      case "peacock":
        return `${base}/peacock.png`;
      // add more cases as needed
      default:
        return `${base}/default.png`; // fallback icon
    }
  };
  

  // Dummy data - replace with real API calls later
  const dummySightings = [
    {
      id: '1',
      animal_type: 'Elephant',
      location_lat: 6.471,
      location_lng: 81.671,
      timestamp: new Date().toISOString(),
      image_url: null,
      reported_by: 'driver-1',
      notes: 'Large herd near waterhole'
    },
    {
      id: '2',
      animal_type: 'Leopard',
      location_lat: 6.473,
      location_lng: 81.673,
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(), // 5 mins ago
      image_url: null,
      reported_by: 'driver-2',
      notes: 'Resting on a tree'
    },
    {
      id: '3',
      animal_type: 'Bear',
      location_lat: 6.469,
      location_lng: 81.675,
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(), // 15 mins ago (should be filtered out)
      image_url: null,
      reported_by: 'driver-3',
      notes: 'Crossing the road'
    }
  ];

  // Load Google Maps script
  useEffect(() => {
    if (window.google?.maps?.Map) {
      setMapLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&loading=async&libraries=marker&callback=initMap`;    script.async = true;
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
        mapId: "6bbf28f0a2a779649aa95dc3", // Add this line
        disableDefaultUI: true,
        gestureHandling: "greedy"
      });
      // Add click listener for reporting sightings
      // const listener = mapInstanceRef.current.addListener("click", (e) => {
      //   const clickedLocation = {
      //     lat: e.latLng.lat(),
      //     lng: e.latLng.lng()
      //   };
      //   setSelectedLocation(clickedLocation);
      //   setShowForm(true);
      // });

      return () => {
        window.google.maps.event.removeListener(listener);
      };
    } catch (error) {
      console.error("Error initializing map:", error);
      setApiError("Error initializing map");
    }
  }, [mapLoaded, selectedLocation, setSelectedLocation]);

  // Load dummy data
  useEffect(() => {
    // Filter out sightings older than 10 minutes immediately
    const now = new Date();
    const tenMinutesAgo = new Date(now.getTime() - 10 * 60000);
    const recentSightings = dummySightings.filter(s => new Date(s.timestamp) >= tenMinutesAgo);
    setSightings(recentSightings);
    
    // Simulate periodic updates
    const interval = setInterval(() => {
      // In a real app, this would fetch from API
      const now = new Date();
      const tenMinutesAgo = new Date(now.getTime() - 10 * 60000);
      const recentSightings = dummySightings.filter(s => new Date(s.timestamp) >= tenMinutesAgo);
      setSightings(recentSightings);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Filter sightings based on criteria
  const getFilteredSightings = () => {
    const now = new Date();
    const tenMinutesAgo = new Date(now.getTime() - 10 * 60000);

    return sightings.filter(sighting => {
      // Check if sighting is within the last 10 minutes
      const isRecent = new Date(sighting.timestamp) >= tenMinutesAgo;
      
      // Apply animal type filter
      const matchesAnimalType = filters.animalType === 'all' || 
        sighting.animal_type.toLowerCase() === filters.animalType.toLowerCase();
      
      return isRecent && matchesAnimalType;
    });
  };

  // Update markers with filtered sightings
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return;

    try {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.map = null);
      markersRef.current = [];

      const { AdvancedMarkerElement, PinElement } = window.google.maps.marker;
      const filteredSightings = getFilteredSightings();

      filteredSightings.forEach(sighting => {
        // Use your own logic or mapping here
        const iconUrl = getAnimalIconUrl(sighting.animal_type);
      
        const img = document.createElement("img");
        img.src = iconUrl;
        img.alt = sighting.animal_type;
        img.style.width = "40px";
        img.style.height = "40px";
        img.style.borderRadius = "50%";
        img.style.border = "2px solid white";
        img.style.boxShadow = "0 0 5px rgba(0,0,0,0.3)";
        img.style.background = "white";
      
        const marker = new window.google.maps.marker.AdvancedMarkerElement({
          position: {
            lat: sighting.location_lat,
            lng: sighting.location_lng
          },
          map: mapInstanceRef.current,
          content: img,
          title: `${sighting.animal_type} - ${new Date(sighting.timestamp).toLocaleString()}`
        });
      
        markersRef.current.push(marker);
      });
      
    } catch (error) {
      console.error("Error updating markers:", error);
    }
  }, [mapLoaded, sightings, filters]);

  // Handle new sighting submission (dummy implementation)
  const handleAddSighting = (sightingData) => {
    const newSighting = {
      id: `dummy-${Math.random().toString(36).substr(2, 9)}`,
      ...sightingData,
      reported_by: 'current-user',
      timestamp: new Date().toISOString()
    };
    
    setSightings(prev => [...prev, newSighting]);
    setShowForm(false);
    alert('Sighting added (dummy data - will be lost on refresh)');
  };

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

      {/* Controls overlay */}
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

      {/* Sighting form modal */}
      {showForm && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-w-md w-full">
            <SightingForm
              location={selectedLocation}
              onSubmit={handleAddSighting}
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