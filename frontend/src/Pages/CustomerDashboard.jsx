import React, { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// //import Header from "../components/customerDashboard/CustomerHeader";
// import Footer from "../components/home/Footer";
// import BookingSummary from "../components/customerDashboard/BookingSummary";
// import MemoryAlbum from "../components/customerDashboard/MemoryAlbum";
// import ReviewSection from "../components/customerDashboard/ReviewSection";

export default function CustomerDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      {/* <Header user={user} /> */}

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-6 space-y-6">
        {/* Welcome */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-[#264653] mb-2">
            Welcome, {user?.name || "Customer"}!
          </h2>
          <p className="text-gray-600">
            Here's a quick overview of your safari experience.
          </p>
        </div>

        {/* Booking Summary */}
        {/* <BookingSummary /> */}

        {/* Memory Album */}
        {/* <MemoryAlbum /> */}

        {/* Reviews */}
        {/* <ReviewSection /> */}
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </main>
  );
}
