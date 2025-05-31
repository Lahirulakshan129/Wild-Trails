import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useState } from 'react'

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

const timeSlotLabel = slot => {
  if (slot === 'morning') return '☀️'
  if (slot === 'evening') return '🌙'
  return '📅'
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
      <div className="flex flex-wrap justify-center items-center space-x-1 mt-1">
        {dayBookings.map((b, idx) => (
          <span
            key={idx}
            className={`text-xs px-1 rounded-full ${getStatusColor(b.status)} text-white`}
            title={`${b.timeSlot} - ${b.tourType}`}
          >
            {timeSlotLabel(b.timeSlot)}
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
    <div className="p-4">
      <Calendar
        onClickDay={showDetails}
        tileContent={tileContent}
        tileClassName="min-h-[80px]"
      />

      {selectedDate && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">Bookings on {selectedDate.date}</h2>
          {selectedDate.bookings.length === 0 ? (
            <p>No bookings.</p>
          ) : (
            <ul className="space-y-2">
              {selectedDate.bookings.map((b, i) => (
                <li key={i} className="p-2 border rounded-xl shadow-sm">
                  <div><strong>Time Slot:</strong> {b.timeSlot}</div>
                  <div><strong>Tour:</strong> {b.tourType}</div>
                  <div><strong>Status:</strong> <span className={`${getStatusColor(b.status)} text-white px-2 py-0.5 rounded`}>{b.status}</span></div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
