import { useState, useEffect } from "react";
import { lazy, Suspense } from "react";
import Sidebar from "../components/adminDashboard/Sidebar";
import Header from "../components/adminDashboard/Header";
import StatsCard from "../components/adminDashboard/StatsCard";
import MapView from "../components/adminDashboard/MapView";
import BookingItem from "../components/adminDashboard/BookingItem";
const ReviewsTable = lazy(() =>
  import("../components/adminDashboard/ReviewsTable")
);
import LoyaltyControl from "../components/adminDashboard/LoyaltyControl";
const SightingSummary = lazy(() =>
  import("../components/adminDashboard/SightingSummary")
);
const DriverManagement = lazy(() =>
    import("../components/adminDashboard/DriverManagement.jsx")
);
import AddDriverForm from "../components/adminDashboard/AddDriverForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/adminDashboard-ui/card";
import { Badge } from "../components/ui/adminDashboard-ui/Badge";
import { Button } from "../components/ui/adminDashboard-ui/Button";
import {
  CalendarClockIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  UsersIcon,
  XCircleIcon,
} from "lucide-react";
const token = localStorage.getItem("token");

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  const MOCK_TODAYS_SAFARIS = [
    {
      id: "TS1",
      time: "06:30 AM",
      guide: "Ajith",
      guests: 6,
      status: "in-progress",
    },
    {
      id: "TS2",
      time: "07:00 AM",
      guide: "Kumar",
      guests: 4,
      status: "in-progress",
    },
    {
      id: "TS3",
      time: "08:30 AM",
      guide: "Malik",
      guests: 2,
      status: "starting-soon",
    },
    {
      id: "TS4",
      time: "09:30 AM",
      guide: "Saman",
      guests: 8,
      status: "starting-soon",
    },
    {
      id: "TS5",
      time: "03:30 PM",
      guide: "Nuwan",
      guests: 5,
      status: "scheduled",
    },
  ];

  const MOCK_BOOKINGS = [
    {
      id: "B1",
      customerName: "John Davis",
      date: "May 27, 2025",
      time: "06:30 AM",
      persons: 4,
      status: "pending",
      package: "Morning Safari",
    },
    {
      id: "B2",
      customerName: "Maria Garcia",
      date: "May 27, 2025",
      time: "03:30 PM",
      persons: 2,
      status: "driver_accepted",
      package: "Afternoon Safari",
    },
    {
      id: "B3",
      customerName: "Robert Wilson",
      date: "May 28, 2025",
      time: "06:00 AM",
      persons: 6,
      status: "pending",
      package: "Full Day Safari",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* <Sidebar /> */}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Dashboard"
          breadcrumbs={["Home", "Dashboard"]}
          adminName={admin?.name}
        />

        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50 to-safari-cream/30 bg-topography bg-opacity-5">
          {/* Welcome Section */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-safari-forest mb-2">
                Welcome, {admin?.name || "Admin"}!
              </h2>
              <p className="text-gray-600">
                Manage your wildlife safari operations efficiently from this dashboard.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="bg-safari-forest text-white px-4 py-2 rounded hover:bg-safari-leaf transition">
                Driver Management
              </button>
              <button className="bg-safari-forest text-white px-4 py-2 rounded hover:bg-safari-leaf transition">
                Package Management
              </button>
            </div>
          </div>

          <div className="space-y-6 pb-8">
            {/* Overview Section */}
            <section id="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <MapView />
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="font-playfair text-lg font-bold text-safari-forest">
                      Today's Safaris
                    </CardTitle>
                    <CardDescription>
                      Scheduled safari trips for today
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {MOCK_TODAYS_SAFARIS.map((safari) => (
                        <div
                          key={safari.id}
                          className="flex justify-between items-center p-2 rounded-lg border border-gray-100"
                        >
                          <div>
                            <div className="flex items-center">
                              <span className="font-medium text-safari-forest">
                                {safari.time}
                              </span>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-sm">{safari.guide}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {safari.guests}{" "}
                              {safari.guests === 1 ? "guest" : "guests"}
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={`
                              ${
                                safari.status === "in-progress"
                                  ? "bg-green-50 text-green-600 border-green-200"
                                  : ""
                              }
                              ${
                                safari.status === "starting-soon"
                                  ? "bg-blue-50 text-blue-600 border-blue-200"
                                  : ""
                              }
                              ${
                                safari.status === "scheduled"
                                  ? "bg-gray-50 text-gray-600 border-gray-200"
                                  : ""
                              }
                            `}
                          >
                            {safari.status === "in-progress"
                              ? "In Progress"
                              : ""}
                            {safari.status === "starting-soon"
                              ? "Starting Soon"
                              : ""}
                            {safari.status === "scheduled" ? "Scheduled" : ""}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium text-gray-500">
                          Quick Stats
                        </h4>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                        >
                          View All
                        </Button>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="border rounded-md p-2 text-center">
                          <div className="text-xs text-gray-500">
                            Active Drivers
                          </div>
                          <div className="text-lg font-bold text-safari-forest">
                            8
                          </div>
                        </div>
                        <div className="border rounded-md p-2 text-center">
                          <div className="text-xs text-gray-500">Vehicles</div>
                          <div className="text-lg font-bold text-safari-forest">
                            12
                          </div>
                        </div>
                        <div className="border rounded-md p-2 text-center">
                          <div className="text-xs text-gray-500">Sightings</div>
                          <div className="text-lg font-bold text-safari-forest">
                            47
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Booking Management Section
            <section id="bookings" className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-playfair font-bold text-safari-forest">Booking Management</h2>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="h-9">
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                    Confirmed
                  </Button>
                  <Button size="sm" variant="outline" className="h-9">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    Pending
                  </Button>
                  <Button size="sm" variant="outline" className="h-9">
                    <XCircleIcon className="h-4 w-4 mr-1" />
                    Cancelled
                  </Button>
                </div>
              </div>
              
              <div className="space-y-1">
                {MOCK_BOOKINGS.map((booking) => (
                  <BookingItem
                    key={booking.id}
                    id={booking.id}
                    customerName={booking.customerName}
                    date={booking.date}
                    time={booking.time}
                    persons={booking.persons}
                    status={booking.status}
                    package={booking.package}
                  />
                ))}
              </div>
            </section> */}

            {/* Reviews and Loyalty */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
              <div className="lg:col-span-2">
                {token ? (
                  <Suspense fallback={<div>Loading reviews...</div>}>
                    <ReviewsTable />
                  </Suspense>
                ) : (
                  <div>Checking login status...</div>
                )}
              </div>
              <div>
                <LoyaltyControl />
              </div>
            </div>

            {/* Driver Management Section */}
            <DriverManagement></DriverManagement>


            {/* Sighting Summary */}
            <section id="summary" className="pt-4 bg-white">
              <Suspense fallback={<div>Loading summary...</div>}>
                <SightingSummary />
              </Suspense>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
