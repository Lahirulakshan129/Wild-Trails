import { useState } from "react";
import { getAuth } from "firebase/auth";

export default function BookingSafariModal({ safari, onClose }) {
  const [isGuest, setIsGuest] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    participants: 1,
    date: "",
    notes: "",
  });
  const [showLoginPrompt, setShowLoginPrompt] = useState(true);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser || JSON.parse(localStorage.getItem("user")) || null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        safariId: safari.packageID,
        safariName: safari.packageName,
        ...formData,
        bookedBy: user ? user.email : "Guest",
      };

      const res = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Safari booked successfully!");
        onClose();
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Error during booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-lg mx-4 p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-safari-charcoal/70 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        {showLoginPrompt && !user && !isGuest ? (
          <div className="text-center">
            <h2 className="font-caveat text-3xl mb-3 text-safari-charcoal">
              Ready to Book?
            </h2>
            <p className="font-aref text-safari-charcoal/80 text-sm mb-6">
              Login to manage your booking, earn loyalty rewards, and track your safari experiences.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => (window.location.href = "/login")}
                className="font-aref bg-safari-green hover:bg-safari-light-green text-[#0D722A] px-6 py-2 rounded-full text-base transition-colors"
              >
                Login Now
              </button>
              <button
                onClick={() => {
                  setIsGuest(true);
                  setShowLoginPrompt(false);
                }}
                className="font-aref border border-safari-green text-safari-green hover:bg-safari-green hover:text-[#0D722A] px-6 py-2 rounded-full text-base transition-colors"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-caveat text-3xl text-safari-charcoal mb-4 text-center">
              Book {safari.packageName}
            </h2>

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
                    className="w-full border border-gray-300 rounded-full px-4 py-2 font-aref text-sm focus:outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-full px-4 py-2 font-aref text-sm focus:outline-none"
                  />
                </>
              )}

              <div className="flex gap-4">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-1/2 border border-gray-300 rounded-full px-4 py-2 font-aref text-sm focus:outline-none"
                />
                <input
                  type="number"
                  name="participants"
                  min="1"
                  max={safari.maxPeople || 10}
                  value={formData.participants}
                  onChange={handleChange}
                  required
                  className="w-1/2 border border-gray-300 rounded-full px-4 py-2 font-aref text-sm focus:outline-none"
                />
              </div>

              <textarea
                name="notes"
                placeholder="Special requests or notes (optional)"
                value={formData.notes}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-2xl px-4 py-2 font-aref text-sm h-24 focus:outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="font-aref bg-safari-green hover:bg-safari-light-green text-[#0D722A] w-full py-2 rounded-full text-base transition-colors"
              >
                {loading ? "Processing..." : "Confirm Booking"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
