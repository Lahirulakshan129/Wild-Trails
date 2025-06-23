import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

// Sightings and Alerts Mock Data (plain JS objects)
const MOCK_SIGHTINGS = [
  {
    id: "s1",
    type: "elephant",
    lat: 6.4698,
    lng: 81.3456,
    timestamp: "10:30 AM",
    reportedBy: "Safari Guide - Ajith",
    count: 5,
    details: "Herd with two calves",
  },
  {
    id: "s2",
    type: "leopard",
    lat: 6.4798,
    lng: 81.3256,
    timestamp: "11:15 AM",
    reportedBy: "Safari Guide - Kumar",
    count: 1,
    details: "Adult male on a tree",
  },
  {
    id: "s3",
    type: "bird",
    lat: 6.4638,
    lng: 81.3556,
    timestamp: "09:45 AM",
    reportedBy: "Tourist - John Smith",
    count: 12,
    details: "Flock of painted storks",
  },
];

const MOCK_ALERTS = [
  {
    id: "a1",
    type: "sos",
    lat: 6.4758,
    lng: 81.3356,
    timestamp: "02:30 PM",
    reportedBy: "Safari Guide - Malik",
    details: "Vehicle breakdown, need assistance",
    status: "active",
  },
  {
    id: "a2",
    type: "danger",
    lat: 6.4858,
    lng: 81.3156,
    timestamp: "01:15 PM",
    reportedBy: "Park Ranger - David",
    details: "Aggressive elephant near water hole",
    status: "active",
  },
];

// Emoji Icons
const getAnimalIcon = (type) => {
  switch (type) {
    case "elephant": return "🐘";
    case "leopard": return "🐆";
    case "bear": return "🐻";
    case "bird": return "🦅";
    default: return "🦓";
  }
};

const getAlertIcon = (type) => {
  switch (type) {
    case "sos": return "🆘";
    case "injury": return "🩹";
    case "danger": return "⚠️";
    case "information": return "ℹ️";
    default: return "⚠️";
  }
};

const MapView = () => {
  const [activeTab, setActiveTab] = useState("sightings");
  const [sightings, setSightings] = useState(MOCK_SIGHTINGS);
  const [alerts, setAlerts] = useState(MOCK_ALERTS);
  const [selectedSighting, setSelectedSighting] = useState(null);
  const [sightingDialogOpen, setSightingDialogOpen] = useState(false);

  const removeSighting = (id) => {
    console.log("Removing sighting", id);
    setSightings(sightings.filter((s) => s.id !== id));
  };

  const viewSightingDetails = (sighting) => {
    console.log("Viewing sighting details", sighting.id);
    setSelectedSighting(sighting);
    setSightingDialogOpen(true);
  };

  const resolveAlert = (id) => {
    console.log("Resolving alert", id);
    setAlerts(alerts.map((alert) =>
      alert.id === id ? { ...alert, status: "resolved" } : alert
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="border-b border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <h2 className="font-playfair text-lg font-bold text-safari-forest">
            {activeTab === "sightings" ? "Animal Sightings" : "SOS & Alerts"}
          </h2>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant={activeTab === "sightings" ? "default" : "outline"}
              className={activeTab === "sightings" ? "bg-safari-teal" : ""}
              onClick={() => setActiveTab("sightings")}
            >
              Sightings
            </Button>
            <Button
              size="sm"
              variant={activeTab === "alerts" ? "default" : "outline"}
              className={activeTab === "alerts" ? "bg-safari-orange" : ""}
              onClick={() => setActiveTab("alerts")}
            >
              Alerts
              {alerts.filter((a) => a.status === "active").length > 0 && (
                <Badge className="ml-1 bg-red-500 text-white h-5 w-5 p-0 flex items-center justify-center">
                  {alerts.filter((a) => a.status === "active").length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 relative min-h-[400px] bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
          <div className="text-center p-4 bg-white/80 rounded-lg shadow-sm">
            <p>Map visualization would appear here</p>
            <p className="text-xs mt-1">(Integrated with animal sightings)</p>
          </div>
        </div>

        {/* Sightings Markers */}
        {activeTab === "sightings" && sightings.map((sighting) => (
          <div
            key={sighting.id}
            className="absolute bg-white p-2 rounded-lg shadow-md border border-gray-200 w-48 text-sm"
            style={{
              left: `${(sighting.lng - 81.3) * 1000}px`,
              top: `${(sighting.lat - 6.46) * 1000}px`,
            }}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="flex items-center">
                <span className="mr-1 text-lg">{getAnimalIcon(sighting.type)}</span>
                <span className="font-medium capitalize">{sighting.type}</span>
              </span>
              <Badge variant="outline" className="text-xs bg-safari-sand/10 text-safari-sand">
                {sighting.count}
              </Badge>
            </div>
            <p className="text-xs text-gray-500">{sighting.timestamp} by {sighting.reportedBy}</p>
            {sighting.details && <p className="text-xs mt-1">{sighting.details}</p>}
            <div className="flex space-x-1 mt-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs text-safari-teal hover:text-safari-teal/80 hover:bg-safari-teal/10 p-0 flex-1 justify-center"
                onClick={() => viewSightingDetails(sighting)}
              >
                Details
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 p-0 flex-1 justify-center"
                onClick={() => removeSighting(sighting.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}

        {/* Alerts Markers */}
        {activeTab === "alerts" && alerts.map((alert) => (
          <div
            key={alert.id}
            className={`absolute bg-white p-2 rounded-lg shadow-md border ${alert.status === "active" ? "border-red-300" : "border-green-300"} w-48 text-sm`}
            style={{
              left: `${(alert.lng - 81.3) * 1000}px`,
              top: `${(alert.lat - 6.46) * 1000}px`,
            }}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="flex items-center">
                <span className="mr-1 text-lg">{getAlertIcon(alert.type)}</span>
                <span className="font-medium capitalize">{alert.type}</span>
              </span>
              <Badge
                variant="outline"
                className={alert.status === "active"
                  ? "text-xs bg-red-50 text-red-500 border-red-200"
                  : "text-xs bg-green-50 text-green-500 border-green-200"}
              >
                {alert.status}
              </Badge>
            </div>
            <p className="text-xs text-gray-500">{alert.timestamp} by {alert.reportedBy}</p>
            <p className="text-xs mt-1">{alert.details}</p>
            {alert.status === "active" && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-1 h-6 text-xs text-green-500 hover:text-green-700 hover:bg-green-50 p-0 w-full justify-start"
                onClick={() => resolveAlert(alert.id)}
              >
                Mark as Resolved
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Sighting Details Dialog */}
      <Dialog open={sightingDialogOpen} onOpenChange={setSightingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedSighting && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <span className="mr-2 text-xl">{getAnimalIcon(selectedSighting.type)}</span>
                  <span className="capitalize">{selectedSighting.type} Sighting</span>
                </DialogTitle>
                <DialogDescription>
                  Reported by {selectedSighting.reportedBy} at {selectedSighting.timestamp}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Location</h4>
                  <p className="text-sm">
                    GPS: {selectedSighting.lat.toFixed(4)}, {selectedSighting.lng.toFixed(4)}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Details</h4>
                  <p className="text-sm">
                    {selectedSighting.details || "No additional details provided"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Count</h4>
                  <p className="text-sm">
                    {selectedSighting.count} {selectedSighting.count === 1 ? "animal" : "animals"} spotted
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MapView;
