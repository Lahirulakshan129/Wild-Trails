import { useState } from "react";
import { getAuth } from "firebase/auth";

export default function BookingHireModal({ tour, onClose }) {
  const auth = getAuth();
  const user = auth.currentUser || JSON.parse(localStorage.getItem("user")) || null;

  const [isGuest, setIsGuest] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(!user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    startDate: "",
    days: 1,
    participants: 1,
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        packageId: tour.packageID,
        bookedBy: user ? user.email : "Guest",
        ...formData,
      };

      const res = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Tour booked successfully!");
        onClose();
      } else {
        alert("Booking failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error during booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-lg p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl hover:text-red-500">✕</button>

        {showLoginPrompt && !isGuest ? (
          <div className="text-center">
            <h2 className="font-caveat text-3xl mb-3">Ready to Book?</h2>
            <p className="font-aref text-sm text-safari-charcoal/80 mb-6">
              Login to manage your bookings or continue as a guest.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => (window.location.href = "/login")}
                className="bg-safari-green text-[#0D722A] px-6 py-2 rounded-full">Login Now</button>
              <button
                onClick={() => {
                  setIsGuest(true);
                  setShowLoginPrompt(false);
                }}
                className="border border-safari-green text-safari-green px-6 py-2 rounded-full">Continue as Guest</button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-caveat text-3xl mb-4 text-center">{tour.packageName}</h2>
            <form onSubmit={handleBooking} className="space-y-4">
              {!user && (
                <>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border px-4 py-2 rounded-full text-sm bg-safari-green-100"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border px-4 py-2 rounded-full text-sm bg-safari-green-100"
                  />
                </>
              )}    
              <div className="flex gap-4">
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-1/2 border px-4 py-2 rounded-full text-sm bg-safari-green-100"
                />
                <input
                  type="number"
                  name="days"
                  min="1"
                  max="30"
                  value={formData.days}
                  onChange={handleChange}
                  required
                  className="w-1/2 border px-4 py-2 rounded-full text-sm bg-safari-green-100"
                />
              </div>
              <input
                type="number"
                name="participants"
                min="1"
                max={tour.capacity || 12}
                value={formData.participants}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-full text-sm bg-safari-green-100"
              />
              <textarea
                name="notes"
                placeholder="Special notes (optional)"
                value={formData.notes}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-2xl text-sm h-24 bg-safari-green-100"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-safari-green text-[#0D722A] w-full py-2 rounded-full">
                {loading ? "Processing..." : "Confirm Booking"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
