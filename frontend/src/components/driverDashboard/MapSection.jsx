import { useEffect, useRef } from "react";
import { Card } from "../ui/driverDashboard-ui/card"; // Adjust the path as needed
import PropTypes from "prop-types";

const MockGoogleMap = ({ selectedLocation, setSelectedLocation, sightings }) => {
  const handleMapClick = (e) => {
    const randomOffset = () => (Math.random() - 0.5) * 0.01;
    const newLocation = { 
      lat: selectedLocation.lat + randomOffset(),
      lng: selectedLocation.lng + randomOffset()
    };
    setSelectedLocation(newLocation);
    console.log("Mock Map clicked at:", newLocation);
  };

  return (
    <div className="h-full w-full bg-green-100 relative" onClick={handleMapClick}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg mb-2">Google Maps Simulation</h3>
          <p className="mb-2">API Key: AIzaSyAnO_zxc5WZBIvCy0M06Z3N7fXGAPlDM4o</p>
          <p>Click anywhere to simulate selecting a location</p>
          <p className="mt-2 text-xs">
            Selected: {selectedLocation.lat.toFixed(5)}, {selectedLocation.lng.toFixed(5)}
          </p>
        </div>
      </div>

      {sightings.map((sighting) => (
        <div
          key={sighting.id}
          className="absolute w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs"
          style={{
            backgroundColor: getAnimalColor(sighting.animalName),
            top: `${(1 - ((sighting.location.lat - 6.47) / 0.03)) * 90}%`,
            left: `${((sighting.location.lng - 81.67) / 0.03) * 90}%`,
          }}
          title={`${sighting.animalName} - ${new Date(sighting.dateTime).toLocaleString()}`}
        >
          {getAnimalInitial(sighting.animalName)}
        </div>
      ))}

      <div
        className="absolute w-8 h-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center"
        style={{
          top: `${(1 - ((selectedLocation.lat - 6.47) / 0.03)) * 90}%`,
          left: `${((selectedLocation.lng - 81.67) / 0.03) * 90}%`,
        }}
      ></div>
    </div>
  );
};

const getAnimalColor = (animalName) => {
  const name = animalName.toLowerCase();
  if (name.includes('elephant')) return '#2A9D8F';
  if (name.includes('leopard')) return '#E9C46A';
  if (name.includes('bear')) return '#264653';
  return '#E76F51';
};

const getAnimalInitial = (animalName) => {
  return animalName.charAt(0);
};

const MapSection = ({ selectedLocation, setSelectedLocation, sightings }) => {
  const mapIdRef = useRef(`map-${Math.random().toString(36).substring(2, 9)}`);

  useEffect(() => {
    console.log(`MapSection initialized with mapId: ${mapIdRef.current}`);
    console.log("Initial selectedLocation:", selectedLocation);
    return () => {
      console.log(`MapSection with mapId: ${mapIdRef.current} unmounting`);
    };
  }, []);

  useEffect(() => {
    console.log("MapSection received new selectedLocation:", selectedLocation);
  }, [selectedLocation]);

  useEffect(() => {
    console.log("MapSection received updated sightings list, count:", sightings.length);
  }, [sightings]);

  return (
    <Card className="h-full w-full overflow-hidden">
      <div className="h-full">
        <MockGoogleMap
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          sightings={sightings}
        />
      </div>
    </Card>
  );
};

MapSection.propTypes = {
  selectedLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  setSelectedLocation: PropTypes.func.isRequired,
  sightings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      animalName: PropTypes.string.isRequired,
      dateTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default MapSection;
