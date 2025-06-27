import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Header from "../components/driverDashboard/DriverHeader";
import Footer from "../components/home/Footer";
import Mapbox from "../components/driverDashboard/MapSection";
import Booking from "../components/driverDashboard/DriverBookingDashboard";
import Calender from "../components/driverDashboard/DriverBookingCalendar";
import Sightingform from "../components/driverDashboard/AnimalSightingForm";
import DriverProfileSidebar from "../components/driverDashboard/DriverProfileSidebar";
import DriverSettingsSidebar from "../components/driverDashboard/DriverSettingsSidebar";

export default function DriverDashboard() {
  const [view, setView] = useState("list");
  const [user, setUser] = useState(null); // Initialize user state
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 6.48553,
    lng: 81.68975,
  });
  const [activePanel, setActivePanel] = useState(null); // State to manage active sidebar panel); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          id: decoded.id,
          name: decoded.name,
          email: decoded.sub,
          role: decoded.role,
        });
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const [sightings, setSightings] = useState([
    {
      id: "1",
      animalName: "Elephant",
      dateTime: "2025-05-25T10:30:00",
      location: { lat: 6.4853, lng: 81.6853 },
    },
    {
      id: "2",
      animalName: "Leopard",
      dateTime: "2025-05-25T09:15:00",
      location: { lat: 6.4803, lng: 81.6793 },
    },
    {
      id: "3",
      animalName: "Crocodile",
      dateTime: "2025-05-25T08:30:00",
      location: { lat: 6.4873, lng: 81.6923 },
    },
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0">
      <div className="w-full h-screen bg-[#F8F9FA] relative ">
        <div className="absolute inset-0 flex flex-col">
        
          <Header setActivePanel={setActivePanel} user={user} />

          <div className="flex-1 container mx-auto p-4 overflow-hidden ">
            <div className="h-full w-full flex flex-col lg:flex-row gap-4">
              {/* Map Section */}
              <Mapbox
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                sightings={sightings}
              />
              {/* Sidebar Section */}
              <div className="w-full lg:w-1/3 h-full flex flex-col space-y-4 overflow-auto scrollbar-hide">
                {/* Animal Sighting Form */}
                <Sightingform />
                {/* SOS Button */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h2 className="text-xl font-serif font-semibold text-[#264653] mb-3">
                    Emergency Assistance
                  </h2>
                  <button className="w-full py-3 bg-[#E76F51] hover:bg-[#E76F51]/90 text-white font-bold rounded-md shadow-lg flex items-center justify-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span>SEND SOS</span>
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    For emergency situations only. Sends your current location to park rangers.
                  </p>
                </div>

                {/* Recent Sightings */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h2 className="text-xl font-serif font-semibold text-[#264653] mb-4">
                    Recent Sightings
                  </h2>
                  <div className="h-[250px] rounded-md border overflow-auto scrollbar-hide space-y-3 p-2">
                    {sightings.map((sighting) => (
                      <div
                        key={sighting.id}
                        className="p-3 rounded-lg border hover:bg-gray-50"
                      >
                        <div className="flex">
                          <div className="text-3xl mr-3">
                            {sighting.animalName === "Elephant"
                              ? "🐘"
                              : sighting.animalName === "Leopard"
                              ? "🐆"
                              : "🐊"}
                          </div>
                          <div>
                            <h3 className="font-medium text-[#264653]">
                              {sighting.animalName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {new Date(sighting.dateTime).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-400">
                              {sighting.location.lat}, {sighting.location.lng}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {sighting.animalName === "Elephant"
                                ? "Family of 5 elephants near the watering hole"
                                : sighting.animalName === "Leopard"
                                ? "Spotted on a tree branch"
                                : "Large crocodile sunbathing on river bank"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Booking />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-screen h-screen flex flex-col bg-white">
        <div className="flex justify-end p-4">
          <button
            onClick={() => setView(view === "list" ? "calendar" : "list")}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            {view === "list" ? "Calendar View" : "List View"}
          </button>
        </div>
        <div className="flex-1 overflow-auto scrollbar-hide">
          {view === "calendar" ? <Calender /> : <Calender />}
        </div>
      </div>

      {/* Footer */}  
      <Footer />

      {/* Sidebar Components */}
      {activePanel === "profile" && (
        <DriverProfileSidebar
          isOpen={activePanel === "profile"}
          onClose={() => setActivePanel(null)}
          user={user}
        />
      )}
      {activePanel === "settings" && (
        <DriverSettingsSidebar
          isOpen={activePanel === "settings"}
          onClose={() => setActivePanel(null)}
        />
      )}
    </main>
  );
}