import { useState } from "react";
import { Calendar } from "@/components/ui/Calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  CalendarIcon,
  ChevronDownIcon,
  RefreshCwIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

// Mock Data (remove TypeScript types)
const MOCK_DATA = [
  {
    date: new Date(2025, 4, 20),
    animals: {
      elephant: 32,
      leopard: 3,
      bear: 1,
      deer: 47,
      bird: 86,
      other: 15,
    },
  },
  {
    date: new Date(2025, 4, 21),
    animals: {
      elephant: 28,
      leopard: 2,
      bear: 0,
      deer: 51,
      bird: 63,
      other: 9,
    },
  },
  {
    date: new Date(2025, 4, 22),
    animals: {
      elephant: 35,
      leopard: 1,
      bear: 2,
      deer: 40,
      bird: 72,
      other: 12,
    },
  },
  {
    date: new Date(2025, 4, 23),
    animals: {
      elephant: 41,
      leopard: 2,
      bear: 0,
      deer: 38,
      bird: 94,
      other: 18,
    },
  },
  {
    date: new Date(2025, 4, 24),
    animals: {
      elephant: 26,
      leopard: 3,
      bear: 1,
      deer: 43,
      bird: 81,
      other: 14,
    },
  },
  {
    date: new Date(2025, 4, 25),
    animals: {
      elephant: 30,
      leopard: 2,
      bear: 1,
      deer: 45,
      bird: 75,
      other: 11,
    },
  },
  {
    date: new Date(2025, 4, 26),
    animals: {
      elephant: 39,
      leopard: 1,
      bear: 0,
      deer: 52,
      bird: 68,
      other: 16,
    },
  },
];

// Emoji display
const getAnimalIcon = (type) => {
  switch (type) {
    case "elephant": return "🐘";
    case "leopard": return "🐆";
    case "bear": return "🐻";
    case "deer": return "🦌";
    case "bird": return "🦅";
    default: return "🦓";
  }
};

const SightingSummary = () => {
  const [date, setDate] = useState(new Date());
  const [dateRange, setDateRange] = useState("today");

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const getTotalSightings = (type) => {
    let todayData = MOCK_DATA.find(
      (d) =>
        d.date.getDate() === date.getDate() &&
        d.date.getMonth() === date.getMonth() &&
        d.date.getFullYear() === date.getFullYear()
    );

    if (!todayData && MOCK_DATA.length > 0) {
      todayData = MOCK_DATA[MOCK_DATA.length - 1];
    }

    return todayData ? todayData.animals[type] : 0;
  };

  const getTotalBySightingType = (type) => {
    return MOCK_DATA.reduce((total, day) => total + day.animals[type], 0);
  };

  const getDateRangeLabel = () => {
    switch (dateRange) {
      case "today": return "Today";
      case "week": return "This Week";
      case "month": return "This Month";
      default: return "";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="font-playfair text-lg font-bold text-safari-forest flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <span>Animal Sighting Summary</span>
          <Button variant="outline" size="sm" className="h-8">
            <RefreshCwIcon className="h-3.5 w-3.5 mr-1" />
            Refresh Data
          </Button>
        </CardTitle>
        <CardDescription>
          Summary of wildlife sightings reported by safari guides
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col md:flex-row md:space-x-4">
          {/* Left Column */}
          <div className="mb-4 md:mb-0">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-500">Select Date</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                    {getDateRangeLabel()}
                    <ChevronDownIcon className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="end">
                  <div className="p-2">
                    {["today", "week", "month"].map((range) => (
                      <div
                        key={range}
                        className="px-2 py-1.5 text-sm hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => setDateRange(range)}
                      >
                        {range === "today"
                          ? "Today"
                          : range === "week"
                          ? "This Week"
                          : "This Month"}
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="border rounded-md p-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mb-2"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? formatDate(date) : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <div className="pt-2 border-t border-gray-100">
                <h4 className="text-xs font-medium text-gray-500 mb-2">
                  Today's Total
                </h4>
                <div className="space-y-1">
                  {Object.keys(MOCK_DATA[0].animals).map((type) => (
                    <div
                      key={type}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="flex items-center">
                        <span className="mr-1.5">{getAnimalIcon(type)}</span>
                        <span className="capitalize">{type}</span>
                      </span>
                      <Badge
                        variant="outline"
                        className="bg-safari-teal/10 text-safari-teal border-safari-teal/20"
                      >
                        {getTotalSightings(type)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Weekly Trend</h3>
            <div className="border rounded-md p-4 h-[300px] relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                <div className="text-center p-4 bg-white/80 rounded-lg shadow-sm">
                  <p>Chart visualization would appear here</p>
                  <p className="text-xs mt-1">(Bar chart showing daily sightings)</p>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-between text-xs text-gray-500">
                  {MOCK_DATA.map((data, index) => (
                    <div key={index} className="text-center">
                      {data.date.getDate()}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.keys(MOCK_DATA[0].animals).map((type) => (
                <div key={type} className="border rounded-md p-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm flex items-center">
                      <span className="mr-1">{getAnimalIcon(type)}</span>
                      <span className="capitalize">{type}s</span>
                    </span>
                  </div>
                  <div className="flex items-end">
                    <span className="text-xl font-bold text-safari-forest">
                      {getTotalBySightingType(type)}
                    </span>
                    <span className="text-xs text-gray-500 ml-1 mb-0.5">total</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SightingSummary;
