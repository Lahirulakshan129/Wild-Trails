import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import '../driverDashboard/custom-css/calendar-custom.css';
import { useState } from 'react'
import { FaSun, FaMoon, FaCalendarDay } from 'react-icons/fa'

const dummyBookings = [
  {
    id: 1,
    date: '2025-06-01',
    timeSlot: 'morning',
    tourType: 'Normal Safari',
    status: 'accepted'
  },
  {
    id: 2,
    date: '2025-06-01',
    timeSlot: 'evening',
    tourType: 'Bird Watching',
    status: 'pending'
  },
  {
    id: 3,
    date: '2025-06-03',
    timeSlot: 'full',
    tourType: 'Normal Safari',
    status: 'rejected'
  }
]

const getStatusColor = status => {
  switch (status) {
    case 'accepted': return 'bg-green-500'
    case 'pending': return 'bg-yellow-500'
    case 'rejected': return 'bg-red-500'
    default: return 'bg-gray-400'
  }
}

const getSlotIcon = slot => {
  switch (slot) {
    case 'morning': return <FaSun className="text-white text-xs" />
    case 'evening': return <FaMoon className="text-white text-xs" />
    case 'full': return <FaCalendarDay className="text-white text-xs" />
    default: return null
  }
}

export default function DriverBookingCalendar() {
  const [selectedDate, setSelectedDate] = useState(null)

  const bookingsByDate = dummyBookings.reduce((acc, booking) => {
    const key = booking.date
    if (!acc[key]) acc[key] = []
    acc[key].push(booking)
    return acc
  }, {})

  const tileContent = ({ date }) => {
    const dateStr = date.toISOString().split('T')[0]
    const dayBookings = bookingsByDate[dateStr] || []
    return (
      <div className="flex flex-wrap justify-center items-center gap-1 mt-1">
        {dayBookings.map((b, idx) => (
          <span
            key={idx}
            className={`w-5 h-5 flex items-center justify-center rounded-full ${getStatusColor(b.status)} shadow-md`}
            title={`${b.timeSlot} - ${b.tourType}`}
          >
            {getSlotIcon(b.timeSlot)}
          </span>
        ))}
      </div>
    )
  }

  const showDetails = date => {
    const key = date.toISOString().split('T')[0]
    const selected = bookingsByDate[key] || []
    setSelectedDate({ date: key, bookings: selected })
  }

  return (
    <div className="p-6 bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-xl shadow-xl">
      <Calendar
        onClickDay={showDetails}
        tileContent={tileContent}
        tileClassName="min-h-[80px] transition-transform duration-200 hover:scale-105 rounded-lg"
        className="rounded-xl overflow-hidden"
      />

      {selectedDate && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2">
            Bookings on {selectedDate.date}
          </h2>

          {selectedDate.bookings.length === 0 ? (
            <p className="text-gray-600 italic">No bookings found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedDate.bookings.map((b, i) => (
                <div
                  key={i}
                  className="p-4 bg-white rounded-xl shadow-md border hover:shadow-lg transition"
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-blue-700 capitalize">
                      {b.timeSlot}
                    </span>
                    <span
                      className={`${getStatusColor(b.status)} text-white px-2 py-0.5 rounded-full text-xs font-medium`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700">
                    <strong>Tour:</strong> {b.tourType}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
