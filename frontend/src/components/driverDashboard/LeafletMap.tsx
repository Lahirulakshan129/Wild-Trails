"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { AnimalSighting, Location } from "./DriverDashboard";

interface LeafletMapProps {
  selectedLocation: Location;
  setSelectedLocation: (location: Location) => void;
  sightings: AnimalSighting[];
  mapId: string; // Unique ID for the map instance
}

// Fix for the missing Leaflet icon issue
const fixLeafletIcon = () => {
  // Always reset the icon options to ensure they're correct
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });
};

// Custom animal icon based on animal type
const getAnimalIcon = (animalName: string) => {
  // Create custom colored markers based on animal type
  // In a real app, you'd use actual animal icons
  let iconColor = "#E76F51"; // Default color
  
  if (animalName.toLowerCase().includes("elephant")) {
    iconColor = "#2A9D8F";
  } else if (animalName.toLowerCase().includes("leopard")) {
    iconColor = "#E9C46A";
  } else if (animalName.toLowerCase().includes("bear")) {
    iconColor = "#264653";
  }

  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${iconColor}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

// Component to handle map click events
const LocationMarker = ({ setSelectedLocation }: { setSelectedLocation: (location: Location) => void }) => {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setSelectedLocation({ lat, lng });
      console.log("Map clicked at:", { lat, lng });
    },
  });

  return null;
};

// Component to update map center when selectedLocation changes
const MapCenterUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  
  useEffect(() => {
    console.log("Updating map center to:", center);
    map.setView(center, map.getZoom());
  }, [center, map]);
  
  return null;
};

const LeafletMap = ({ selectedLocation, setSelectedLocation, sightings, mapId }: LeafletMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  
  // Initialize Leaflet icons once when component mounts
  useEffect(() => {
    console.log(`LeafletMap with ID: ${mapId} initializing`);
    fixLeafletIcon();
    
    // Clean up Leaflet map instance when component unmounts
    return () => {
      console.log(`LeafletMap with ID ${mapId} unmounting`);
      // Make sure to clean up any map instances
      if (mapRef.current) {
        console.log("Destroying map instance");
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapId]);

  const center: [number, number] = [selectedLocation.lat, selectedLocation.lng];

  return (
    <div id={`map-wrapper-${mapId}`} style={{ height: "100%", width: "100%" }}>
      <MapContainer
        id={mapId}
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        ref={(map) => {
          if (map) {
            console.log(`Map created with ID: ${mapId}`);
            mapRef.current = map;
          }
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Component to update map center when selectedLocation changes */}
        <MapCenterUpdater center={center} />
        
        {/* Current selected location marker */}
        <Marker position={center}>
          <Popup>Current Selected Location</Popup>
        </Marker>
        
        {/* Display all sightings on the map */}
        {sightings.map((sighting) => (
          <Marker
            key={sighting.id}
            position={[sighting.location.lat, sighting.location.lng]}
            icon={getAnimalIcon(sighting.animalName)}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{sighting.animalName}</h3>
                <p>{sighting.dateTime.toLocaleString()}</p>
                {sighting.notes && <p>{sighting.notes}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Component to handle map click events */}
        <LocationMarker setSelectedLocation={setSelectedLocation} />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;