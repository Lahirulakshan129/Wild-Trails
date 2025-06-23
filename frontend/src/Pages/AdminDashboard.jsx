import React, { useState, useEffect } from "react";
import AddDriverForm from "../components/adminDashboard/AddDriverForm";

export default function AdminDashboard() {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const storedAdmin = localStorage.getItem("admin");
        if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
        }
    }, []);

    return (
        <main className="flex flex-col min-h-screen bg-[#F8F9FA]">
            {/* Header */}
            <header className="bg-[#264653] text-white p-4">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </header>

            {/* Main Content */}

            <div className="flex-1 container mx-auto px-4 py-6 space-y-6">
                {/* Welcome Section */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold text-[#264653] mb-2">
                        Welcome, {admin?.name || "Admin"}!
                    </h2>
                    <p className="text-gray-600">
                        Manage your platform efficiently from this.
                    </p>
                </div>

                {/* User Management */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold text-[#264653] mb-2">User Management</h3>
                    <p className="text-gray-600">View and manage registered users.</p>
                    {/* Add functionality to list users */}
                </div>

                {/* Booking Management */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold text-[#264653] mb-2">Booking Management</h3>
                    <p className="text-gray-600">Track and manage bookings.</p>
                    {/* Add functionality to list bookings */}
                </div>

                {/* Reports */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold text-[#264653] mb-2">Reports</h3>
                    <p className="text-gray-600">Generate and view reports.</p>
                    {/* Add functionality for reports */}
                </div>

                {/* Temporary Driver Form Section */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold text-[#264653] mb-4">Add a Driver (Temporary)</h3>
                    <AddDriverForm />
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#264653] text-white p-4 text-center">
                <p>&copy; 2023 Wild Trails. All rights reserved.</p>
            </footer>
        </main>
    );
}
