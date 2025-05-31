import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header2() {
 // const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
<div className="bg-[#212529] text-white">
<div className="container mx-auto px-4 py-2">
  <nav className="flex justify-center space-x-8 font-[Inter]">
    {/* View Bookings */}
    <div className="relative group">
      <Link
        to="/bookings"
        className="text-white text-[12px] font-normal hover:text-safari-gold transition-colors"
      >
        View Bookings
      </Link>
      <div className="absolute hidden group-hover:block bg-[#454442] text-white mt-2 rounded shadow-lg">
        <ul className="space-y-2 p-2">
          <li>
            <Link
              to="/bookings/morning-safari"
              className="block text-[12px] hover:text-safari-gold transition-colors"
            >
              Morning Safari
            </Link>
          </li>
          <li>
            <Link
              to="/bookings/evening-safari"
              className="block text-[12px] hover:text-safari-gold transition-colors"
            >
              Evening Safari
            </Link>
          </li>
          <li>
            <Link
              to="/bookings/full-day-bird-watching"
              className="block text-[12px] hover:text-safari-gold transition-colors"
            >
              Full Day Bird Watching
            </Link>
          </li>
        </ul>
      </div>
    </div>

    {/* Taxi Service */}
    <div className="relative group">
      <Link
        to="/taxi-service"
        className="text-white text-[12px] font-normal hover:text-safari-gold transition-colors"
      >
        Taxi Service
      </Link>
      <div className="absolute hidden group-hover:block bg-[#454442] text-white mt-2 rounded shadow-lg">
        <ul className="space-y-2 p-2">
          <li>
            <Link
              to="/taxi-service/airport-transport"
              className="block text-[12px] hover:text-safari-gold transition-colors"
            >
              Airport Transport
            </Link>
          </li>
          <li>
            <Link
              to="/taxi-service/arugambe-connections"
              className="block text-[12px] hover:text-safari-gold transition-colors"
            >
              Arugambe Connections
            </Link>
          </li>
          <li>
            <Link
              to="/taxi-service/private-tours"
              className="block text-[12px] hover:text-safari-gold transition-colors"
            >
              Private Tours
            </Link>
          </li>
          <li>
            <Link
              to="/taxi-service/tuk-tuk-hire"
              className="block text-[12px] hover:text-safari-gold transition-colors"
            >
              Tuk Tuk Hire
            </Link>
          </li>
        </ul>
      </div>
    </div>

    {/* Activities */}
    <div className="relative group">
      <Link
        to="/activities"
        className="text-white text-[12px] font-normal hover:text-safari-gold transition-colors"
      >
        Activities
      </Link>
      <div className="absolute hidden group-hover:block bg-[#454442] text-white mt-2 rounded shadow-lg">
        <ul className="space-y-2 p-2">
          <li>
            <Link
              to="/activities/kudumbigala-rock"
              className="block text-[12px] hover:text-safari-gold transition-colors"
            >
              Kudumbigala Rock
            </Link>
          </li>
          <li>
            <Link
              to="/activities/lagoon-boat-tour"
              className="block text-[12px] hover:text-safari-gold transition-colors"
            >
              Lagoon Boat Tour
            </Link>
          </li>
          <li>
            <Link
              to="/activities/surfing-arugambe"
              className="block text-[12px] hover:text-safari-gold transition-colors"
            >
              Surfing in Arugambe
            </Link>
          </li>
          <li>
            <Link
              to="/activities/cooking-class"
              className="block text-[12px] hover:text-safari-gold transition-colors"
            >
              Cooking Class
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>
</div>
  );
}