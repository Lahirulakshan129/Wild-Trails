import { Clock, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TourCard({ image, title, duration, time, maxPeople, price }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="relative h-44 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-center font-serif text-lg font-medium text-safari-charcoal mb-2">{title}</h3>

        <div className="space-y-1 mb-3">
          <div className="flex items-center justify-center text-xs text-safari-charcoal">
            <Clock size={14} className="mr-1 text-safari-green" />
            <span>{time}</span>
          </div>

          <div className="flex items-center justify-center text-xs text-safari-charcoal">
            <Calendar size={14} className="mr-1 text-safari-green" />
            <span>{duration}</span>
          </div>

          <div className="flex items-center justify-center text-xs text-safari-charcoal">
            <Users size={14} className="mr-1 text-safari-green" />
            <span>Max {maxPeople} people</span>
          </div>
        </div>

        <div className="flex justify-center">
          <Link 
            to="/#contact" 
            className="bg-safari-green text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-safari-light-green transition-colors w-full text-center"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
