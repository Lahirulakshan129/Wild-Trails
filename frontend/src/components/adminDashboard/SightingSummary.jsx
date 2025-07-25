import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar } from "@/components/ui/adminDashboard-ui/Calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/adminDashboard-ui/Card";
import { Badge } from "@/components/ui/adminDashboard-ui/Badge";
import { Button } from "@/components/ui/adminDashboard-ui/Button";
import {
  CalendarIcon,
  RefreshCwIcon,
  MapPinIcon,
  ExternalLinkIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/adminDashboard-ui/Popover";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as Tooltip from "@radix-ui/react-tooltip";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const BACKEND_URL = "http://localhost:8080";
export const fetchAnimalHotspots = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BACKEND_URL}/api/sightings/hotspots`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching animal hotspots:", error);
    return [];
  }
};

const getAnimalIcon = (type) => {
  switch (type) {
    case "elephant":
      return "🐘";
    case "leopard":
      return "🐆";
    case "bear":
      return "🐻";
    default:
      return "🦓";
  }
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);

const formatMonth = (date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  }).format(date);

const MapPopup = ({ location, animalType, date }) => {
  if (!location.lat || !location.lon) {
    return (
      <div className="p-4 text-center text-gray-500 bg-gray-50 rounded">
        No location data available for this sighting
      </div>
    );
  }

  const position = [location.lat, location.lon];

  return (
    <div className="w-full max-w-[90vw] sm:max-w-[400px] bg-white rounded-lg overflow-hidden">
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "300px", width: "100%" }}
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <div className="text-center">
              <span className="text-xl">{getAnimalIcon(animalType)}</span>
              <div className="font-medium capitalize">
                {animalType} Sighting
              </div>
              <div className="text-sm">{location.name}</div>
              <div className="text-xs text-gray-600">
                {formatDate(new Date(date))}
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      <div className="p-3 text-sm border-t bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div>
          <div className="font-medium">{location.name}</div>
          <div className="text-gray-600 font-mono">
            {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
          </div>
        </div>
        <a
          href={`https://www.google.com/maps?q=${location.lat},${location.lon}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-safari-teal hover:underline text-sm flex items-center bg-white px-2 py-1 rounded"
        >
          Open in Maps <ExternalLinkIcon className="ml-1 h-3 w-3" />
        </a>
      </div>
    </div>
  );
};

const token = localStorage.getItem("token");
const SightingSummary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedAnimal, setSelectedAnimal] = useState("leopard");
  const [sightingsData, setSightingsData] = useState([]);
  const [selectedDateData, setSelectedDateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hotspots, setHotspots] = useState({});

  useEffect(() => {
    const fetchLast30Days = async () => {
      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/sightings/last-30-days`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = Array.isArray(response.data) ? response.data : [];

        setSightingsData(data);
        if (data.length > 0) {
          const latestDate = new Date(data[data.length - 1].date);
          setSelectedDate(latestDate);
          setSelectedMonth(
            new Date(latestDate.getFullYear(), latestDate.getMonth(), 1)
          );
          setSelectedDateData(data[data.length - 1] || null);
        } else {
          setError("No data returned for the last 30 days.");
        }
      } catch (err) {
        console.error("Error fetching last 30 days:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        });
        setError("Failed to fetch data. Please try again.");
        setSightingsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLast30Days();
  }, [token]);

  useEffect(() => {
    const loadHotspots = async () => {
      const hotspotData = await fetchAnimalHotspots();
      const mapped = {};
      hotspotData.forEach((item) => {
        mapped[item.animalName] = {
          lat: item.lat,
          lng: item.lng,
          sightingsCount: item.sightingsCount,
          locationName: `Lat: ${item.lat.toFixed(4)}, Lng: ${item.lng.toFixed(
            4
          )}`,
        };
      });
      setHotspots(mapped);
    };

    loadHotspots();
  }, []);

  useEffect(() => {
    const fetchMonthData = async () => {
      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/sightings/month?year=${selectedMonth.getFullYear()}&month=${
            selectedMonth.getMonth() + 1
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = Array.isArray(response.data) ? response.data : [];
        setSightingsData(data);
      } catch (err) {
        console.error("Error fetching month data:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        });
        setError("Failed to fetch month data. Please try again.");
        setSightingsData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMonthData();
  }, [selectedMonth, token]);

  // Fetch data for selected date
  useEffect(() => {
    const fetchDateData = async () => {
      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/sightings/date?date=${
            selectedDate.toISOString().split("T")[0]
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSelectedDateData(response.data || null);
      } catch (err) {
        console.error("Error fetching date data:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        });
        setError("Failed to fetch date data. Please try again.");
        setSelectedDateData(sightingsData[sightingsData.length - 1] || null);
      } finally {
        setLoading(false);
      }
    };
    fetchDateData();
  }, [selectedDate, sightingsData, token]);

  const normalizedData = sightingsData
    .filter((entry) => entry && entry.date && entry.animals && entry.locations)
    .map((entry) => ({
      date: new Date(entry.date),
      animals: {
        elephant: entry.animals?.elephant || 0,
        leopard: entry.animals?.leopard || 0,
        bear: entry.animals?.bear || 0,
      },
      locations: {
        elephant: entry.locations?.elephant || {
          lat: null,
          lon: null,
          name: "No sightings",
        },
        leopard: entry.locations?.leopard || {
          lat: null,
          lon: null,
          name: "No sightings",
        },
        bear: entry.locations?.bear || {
          lat: null,
          lon: null,
          name: "No sightings",
        },
      },
    }));
  // const availableMonths = Array.from(
  //   new Set(
  //     normalizedData.map((entry) =>
  //       `${entry.date.getFullYear()}-${entry.date.getMonth()}`
  //     )
  //   )
  // )
  // .map((monthStr) => {
  //   const [year, month] = monthStr.split('-').map(Number);
  //   return new Date(year, month, 1);
  // })
  // .sort((a, b) => b - a);
  const fetchedMonths = Array.from(
    new Set(
      normalizedData.map((entry) =>
        new Date(entry.date.getFullYear(), entry.date.getMonth(), 1).getTime()
      )
    )
  ).map((timestamp) => new Date(timestamp));

  const currentDate = new Date();
  const currentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 11,
    1
  );
  const allAvailableMonths = [];
  for (
    let date = new Date(currentMonth);
    date >= startDate;
    date.setMonth(date.getMonth() - 1)
  ) {
    allAvailableMonths.push(new Date(date));
  }
  const availableMonths = allAvailableMonths.sort((a, b) => b - a);
  const filteredData = normalizedData.filter(
    (entry) =>
      entry.date.getFullYear() === selectedMonth.getFullYear() &&
      entry.date.getMonth() === selectedMonth.getMonth()
  );
  const totalSightings = filteredData.reduce(
    (total, day) => total + day.animals[selectedAnimal],
    0
  );
  const averageSightings = filteredData.length
    ? (totalSightings / filteredData.length).toFixed(1)
    : 0;
  const maxSightings = filteredData.length
    ? Math.max(...filteredData.map((day) => day.animals[selectedAnimal]))
    : 0;
  const peakDay = filteredData.find(
    (day) => day.animals[selectedAnimal] === maxSightings
  );
  if (!loading && !error && normalizedData.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-safari-teal/5 to-white">
        <CardContent className="p-6 text-center">
          <div className="text-gray-500">No sighting data available for this month Please refresh to fetch latest summery data.</div>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Loading and Error States
  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-safari-teal/5 to-white">
        <CardContent className="p-6 text-center">
          <div className="text-gray-500">Loading data...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-gradient-to-br from-safari-teal/5 to-white">
        <CardContent className="p-6 text-center">
          <div className="text-red-500">{error}</div>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-safari-teal/5 to-white">
      <CardHeader className="pb-2">
        <CardTitle className="font-playfair text-lg font-bold text-safari-forest flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <span>Wildlife Sighting Dashboard</span>
          <Button
            variant="outline"
            size="sm"
            className="h-8 bg-white hover:bg-gray-50"
            onClick={() => window.location.reload()}
          >
            <RefreshCwIcon className="h-3.5 w-3.5 mr-1" />
            Refresh Data
          </Button>
        </CardTitle>
        <CardDescription>
          Comprehensive wildlife tracking with location mapping and trend
          analysis <b>(for this Month)</b>
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* All Species Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            All Species
          </h3>
          <div className="border rounded-md p-3 bg-white grid grid-cols-2 sm:grid-cols-3 gap-2 shadow-sm">
            {["elephant", "leopard", "bear"].map((animal) => {
              const total = filteredData.reduce(
                (sum, day) => sum + day.animals[animal],
                0
              );
              return (
                <div
                  key={animal}
                  className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                    animal === selectedAnimal
                      ? "bg-safari-teal/20 border border-safari-teal/30 shadow-inner"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                  onClick={() => setSelectedAnimal(animal)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{getAnimalIcon(animal)}</span>
                    <div>
                      <div className="capitalize font-medium">{animal}</div>
                      <div className="text-xs text-gray-500">
                        {total} total sightings
                      </div>
                    </div>
                  </div>
                  {animal === selectedAnimal && (
                    <div className="w-2 h-2 rounded-full bg-safari-teal"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Sightings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-safari-forest">
                {totalSightings}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {selectedAnimal.charAt(0).toUpperCase() +
                  selectedAnimal.slice(1)}{" "}
                sightings
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Daily Average
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-safari-forest">
                {averageSightings}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {formatMonth(selectedMonth)}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Peak Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-safari-forest">
                {maxSightings}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {peakDay ? formatDate(peakDay.date) : "N/A"}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Current Hotspot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-safari-forest truncate">
                  {hotspots[selectedAnimal]?.locationName || "Unknown Area"}
                </div>

                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <div className="text-gray-400 hover:text-gray-600 transition cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10A8 8 0 112 10a8 8 0 0116 0zM9 8a1 1 0 112 0v4a1 1 0 01-2 0V8zm1-4a1.25 1.25 0 100 2.5A1.25 1.25 0 0010 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="bg-gray-200 text-black text-sm px-3 py-1.5 rounded shadow-md z-50"
                        side="top"
                        sideOffset={6}
                      >
                        This shows the location with the highest number of
                        sightings this month for the selected animal.
                        <Tooltip.Arrow className="fill-gray-900" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </div>

              {hotspots[selectedAnimal]?.lat &&
              hotspots[selectedAnimal]?.lng ? (
                <div className="text-xs text-gray-500 mt-1 truncate">
                  <a
                    href={`https://www.google.com/maps?q=${hotspots[selectedAnimal].lat},${hotspots[selectedAnimal].lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-blue-600"
                  >
                    {hotspots[selectedAnimal].lat.toFixed(4)},{" "}
                    {hotspots[selectedAnimal].lng.toFixed(4)}
                  </a>
                </div>
              ) : (
                <div className="text-xs text-gray-500 mt-1">
                  No location data
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4">
          {/* Left Column - Filters and Daily Summary */}
          <div className="mb-4 md:mb-0 md:w-1/3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-500">
                Select Filters
              </h3>
            </div>

            <div className="border rounded-md p-3 bg-white shadow-sm">
              <h4 className="text-xs font-medium text-gray-500 mb-2">Month</h4>
              <select
                className="w-full border rounded text-sm px-2 py-1 mb-3 bg-white hover:bg-gray-50"
                value={selectedMonth.toISOString()}
                onChange={(e) => setSelectedMonth(new Date(e.target.value))}
              >
                {availableMonths.map((month) => (
                  <option key={month.toISOString()} value={month.toISOString()}>
                    {formatMonth(month)}
                  </option>
                ))}
              </select>

              <h4 className="text-xs font-medium text-gray-500 mb-2">
                Select Date
              </h4>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mb-3 bg-white hover:bg-gray-50"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDate(selectedDate)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    disabled={(date) =>
                      !normalizedData.some(
                        (entry) =>
                          entry.date.getDate() === date.getDate() &&
                          entry.date.getMonth() === date.getMonth() &&
                          entry.date.getFullYear() === date.getFullYear()
                      )
                    }
                  />
                </PopoverContent>
              </Popover>

              <div className="pt-3 border-t border-gray-100">
                <h4 className="text-xs font-medium text-gray-500 mb-2">
                  Selected Date Sightings
                </h4>
                <div className="space-y-2">
                  {["elephant", "leopard", "bear"].map((type) => (
                    <div
                      key={type}
                      className={`flex justify-between items-center text-sm p-2 rounded cursor-pointer transition-colors ${
                        type === selectedAnimal
                          ? "bg-safari-teal/20 border border-safari-teal/30"
                          : "hover:bg-gray-50 border border-transparent"
                      }`}
                      onClick={() => setSelectedAnimal(type)}
                    >
                      <span className="flex items-center">
                        <span className="mr-2 text-lg">
                          {getAnimalIcon(type)}
                        </span>
                        <span className="capitalize">{type}</span>
                      </span>
                      <Badge
                        variant={
                          type === selectedAnimal ? "default" : "outline"
                        }
                        className={
                          type === selectedAnimal
                            ? "bg-safari-teal text-white"
                            : "bg-white"
                        }
                      >
                        {selectedDateData?.animals?.[type] || 0}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Data Visualization */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">
                {selectedAnimal.charAt(0).toUpperCase() +
                  selectedAnimal.slice(1)}{" "}
                Analysis
              </h3>
              <select
                className="border rounded text-sm px-2 py-1 bg-white hover:bg-gray-50"
                value={selectedAnimal}
                onChange={(e) => setSelectedAnimal(e.target.value)}
              >
                {["elephant", "leopard", "bear"].map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="border rounded-md overflow-x-auto bg-white shadow-sm">
              <table className="w-full text-sm min-w-[600px]">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Sightings</th>
                    <th className="p-3">% of Total</th>
                    <th className="p-3">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((entry, index) => {
                    const percentOfTotal = totalSightings
                      ? (
                          (entry.animals[selectedAnimal] / totalSightings) *
                          100
                        ).toFixed(1)
                      : 0;
                    const location = entry.locations[selectedAnimal];

                    return (
                      <tr
                        key={index}
                        className={`border-t ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-gray-100`}
                      >
                        <td className="p-3 whitespace-nowrap">
                          {formatDate(entry.date)}
                        </td>
                        <td className="p-3 font-medium text-safari-forest">
                          {entry.animals[selectedAnimal]}
                        </td>
                        <td className="p-3">{percentOfTotal}%</td>
                        <td className="p-3">
                          {location.lat ? (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 text-safari-teal bg-safari-teal/10 hover:bg-safari-teal/20"
                                >
                                  <MapPinIcon className="h-3.5 w-3.5 mr-1" />
                                  {location.name}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[90vw] sm:w-[400px] p-0">
                                <MapPopup
                                  location={location}
                                  animalType={selectedAnimal}
                                  date={entry.date}
                                />
                              </PopoverContent>
                            </Popover>
                          ) : (
                            <span className="text-gray-400">No data</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Recommendations Section */}
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Management Recommendations
              </h3>
              <div className="border rounded-md p-4 bg-safari-teal/10 border-safari-teal/20">
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong>Best viewing times:</strong> Early morning (6-8am)
                    and late afternoon (4-6pm) based on historical patterns
                  </li>
                  <li>
                    <strong>Current hotspot:</strong>{" "}
                    {peakDay?.locations[selectedAnimal].name ||
                      "Northern sector"}{" "}
                    - consider increasing ranger patrols in this area
                  </li>
                  <li>
                    <strong>Visitor experience:</strong> Highlight{" "}
                    {selectedAnimal} sightings in today's visitor briefing
                  </li>
                  <li>
                    <strong>Conservation note:</strong>{" "}
                    {selectedAnimal === "leopard" || selectedAnimal === "bear"
                      ? "Monitor human-wildlife conflict potential"
                      : "Normal activity patterns observed"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SightingSummary;
