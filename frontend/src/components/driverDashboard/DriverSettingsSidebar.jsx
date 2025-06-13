import { useState, useRef } from "react";
import { X, Camera, Bell, Palette ,Clock} from "lucide-react";

export default function DriverSettingsSidebar({ isOpen, onClose }) {
  const [availability, setAvailability] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  });
  const [theme, setTheme] = useState("light");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [photo, setPhoto] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const fileInputRef = useRef();

  const handlePasswordChange = () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    if (password && !handlePasswordChange()) return;
    setShowConfirmModal(true);
  };

  const confirmSave = () => {
    // Simulate API call to save settings
    console.log("Saving settings:", { availability, notifications, theme, password, photo });
    setShowConfirmModal(false);
    setPassword("");
    setConfirmPassword("");
    // Optionally close sidebar after saving
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 h-full w-96 bg-gradient-to-b from-green-50 to-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-labelledby="settings-sidebar-title"
      >
        <div className="flex justify-between items-center p-6 border-b border-green-200">
          <h2 id="settings-sidebar-title" className="text-xl font-bold text-green-900 flex items-center gap-2">
            <Palette className="h-6 w-6" /> Driver Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-red-100 transition-colors"
            aria-label="Close settings sidebar"
          >
            <X className="text-gray-700 hover:text-red-500 h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-gray-800">
          {/* Profile Photo Upload */}
          <div>
            <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
              <Camera className="h-5 w-5" /> Profile Photo
            </h3>
            <div className="flex items-center gap-4">
              <img
                src={photo || "/driver-placeholder.png"}
                alt="Profile preview"
                className="w-16 h-16 rounded-full object-cover border-2 border-green-200"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm"
              >
                Upload Photo
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5" /> Availability
            </h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600 rounded"
                checked={availability}
                onChange={() => setAvailability(!availability)}
              />
              <span className="text-sm font-medium">Available for Safaris</span>
            </label>
          </div>

          {/* Notification Preferences */}
          <div>
            <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
              <Bell className="h-5 w-5" /> Notifications
            </h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600 rounded"
                checked={notifications.email}
                onChange={() => setNotifications((prev) => ({ ...prev, email: !prev.email }))}
              />
              <span className="text-sm font-medium">Email Notifications</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer mt-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600 rounded"
                checked={notifications.push}
                onChange={() => setNotifications((prev) => ({ ...prev, push: !prev.push }))}
              />
              <span className="text-sm font-medium">Push Notifications</span>
            </label>
          </div>

          {/* Theme Selection */}
          <div>
            <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
              <Palette className="h-5 w-5" /> Theme
            </h3>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          {/* Change Password */}
          <div>
            <h3 className="font-semibold text-green-900 mb-3">Change Password</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
                />
              </div>
              {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveChanges}
            className="w-full py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition shadow-md"
          >
            Save Changes
          </button>
        </div>
      </aside>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-80 shadow-xl">
            <h3 className="text-lg font-semibold text-green-900 mb-4">Confirm Changes</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to save these settings?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmSave}
                className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}