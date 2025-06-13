import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Bell } from "lucide-react";

export default function DriverHeader({ setActivePanel, user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const menuRef = useRef();
  const notificationRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // Mock notifications (replace with real fetch)
    setNotifications([
      { id: 1, message: "Elephant sighting added to your route", time: "2 min ago" },
      { id: 2, message: "Admin assigned new safari group", time: "10 min ago" },
    ]);

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (notificationRef.current && !notificationRef.current.contains(e.target)) setShowNotifications(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const clearNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <header className="bg-green-900 text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      <h1 className="text-xl font-bold tracking-wide">Kumana Driver Dashboard</h1>

      {user && (
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full hover:bg-green-800 transition"
              aria-label="Notifications"
            >
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-yellow-400 rounded-full"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-black rounded-lg shadow-lg z-50">
                <div className="px-4 py-2 border-b font-medium bg-gray-100 text-green-900">
                  Notifications ({notifications.length})
                </div>
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="px-4 py-2 hover:bg-gray-100 flex justify-between items-center text-sm transition"
                    >
                      <div>
                        <p>{notif.message}</p>
                        <p className="text-gray-500 text-xs">{notif.time}</p>
                      </div>
                      <button
                        onClick={() => clearNotification(notif.id)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        Clear
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500">No new notifications</div>
                )}
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 bg-green-800 px-4 py-2 rounded-full hover:bg-green-700 transition"
            >
              <span className="hidden sm:inline font-medium">
                {user.name || user.email}
              </span>
              <ChevronDown size={18} className={`${menuOpen ? "rotate-180" : ""} transition-transform`} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white text-black rounded-lg shadow-lg z-50">
                <div className="px-4 py-3 border-b bg-gray-100">
                  <p className="font-semibold truncate">{user.name || user.email}</p>
                  <p className="text-gray-500 text-xs">Role: {user.role}</p>
                </div>
                <button
                  onClick={() => {
                    setActivePanel("profile");
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    setActivePanel("settings");
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}