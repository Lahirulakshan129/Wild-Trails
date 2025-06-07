import { Clock, Calendar, Users } from 'lucide-react';

export default function TourCard({ image, title, time, duration, maxPeople }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      {/* Image section - now properly displayed */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Safari+Image';
          }}
        />
      </div>

      <div className="p-5">
        <h3 className="text-center font-aref font-bold text-xl text-safari-charcoal mb-4">{title}</h3>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-center text-sm text-safari-charcoal">
            <Clock size={16} className="mr-2 text-safari-green" />
            <span>{time}</span>
          </div>

          <div className="flex items-center justify-center text-sm text-safari-charcoal">
            <Calendar size={16} className="mr-2 text-safari-green" />
            <span>{duration}</span>
          </div>

          <div className="flex items-center justify-center text-sm text-safari-charcoal">
            <Users size={16} className="mr-2 text-safari-green" />
            <span>{maxPeople} Max</span>
          </div>
        </div>

        <button className="w-full py-2 bg-safari-green text-white font-aref font-bold rounded hover:bg-green-700 transition">
          Book Now &gt;&gt;
        </button>
      </div>
    </div>
  );
}