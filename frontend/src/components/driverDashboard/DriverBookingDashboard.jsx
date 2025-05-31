import { useEffect, useState } from 'react'

function BookingCard({ booking, onAccept, onReject, showActions }) {
  return (
    <div className="border rounded-2xl shadow-md p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center">
      <div className="space-y-1">
        <div className="text-lg font-semibold">{booking.date} — {booking.timeSlot}</div>
        <div>Customer: {booking.customerName}</div>
        <div>Participants: {booking.participants}</div>
        <div>Status: {booking.status}</div>
      </div>
      {showActions && (
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button
            onClick={onAccept}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
          >
            Accept
          </button>
          <button
            onClick={onReject}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  )
}

export default function DriverBookingDashboard() {
  const [bookings, setBookings] = useState([])
  const [activeTab, setActiveTab] = useState('pending')

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        date: '2025-06-01',
        timeSlot: '6:00 AM - 9:00 AM',
        customerName: 'John Silva',
        participants: 3,
        status: 'pending',
      },
      {
        id: 2,
        date: '2025-06-02',
        timeSlot: '2:00 PM - 5:00 PM',
        customerName: 'Nimali Perera',
        participants: 4,
        status: 'accepted',
      },
      {
        id: 3,
        date: '2025-06-04',
        timeSlot: '10:00 AM - 1:00 PM',
        customerName: 'Arun Raj',
        participants: 2,
        status: 'pending',
      }
    ]
    setBookings(dummyData)
  }, [])

  const handleAccept = id => {
    setBookings(prev =>
      prev.map(b => b.id === id ? { ...b, status: 'accepted' } : b)
    )
  }

  const handleReject = id => {
    setBookings(prev =>
      prev.map(b => b.id === id ? { ...b, status: 'rejected' } : b)
    )
  }

  const filtered = bookings.filter(b =>
    activeTab === 'pending' ? b.status === 'pending'
    : activeTab === 'accepted' ? b.status === 'accepted'
    : b.status !== 'rejected'
  )

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">My Bookings</h1>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-xl ${activeTab === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 rounded-xl ${activeTab === 'accepted' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            onClick={() => setActiveTab('accepted')}
          >
            Accepted
          </button>
          <button
            className={`px-4 py-2 rounded-xl ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">No bookings to show.</p>
      ) : (
        filtered.map(booking => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onAccept={() => handleAccept(booking.id)}
            onReject={() => handleReject(booking.id)}
            showActions={booking.status === 'pending'}
          />
        ))
      )}
    </div>
  )
}
