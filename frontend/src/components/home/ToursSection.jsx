import TourCard from './TourCard';

export default function ToursSection() {
  const tours = [
    {
      id: 1,
      image: '',
      title: 'Morning Safari',
      duration: '3 hours',
      time: '5:30 AM - 8:30 AM',
      maxPeople: 6,
      price: 45
    },
    {
      id: 2,
      image: '',
      title: 'Full Day Safari',
      duration: '8 hours',
      time: '5:30 AM - 1:30 PM',
      maxPeople: 4,
      price: 85
    },
    {
      id: 3,
      image: '',
      title: 'Evening Safari',
      duration: '3 hours',
      time: '2:30 PM - 5:30 PM',
      maxPeople: 6,
      price: 45
    }
  ];

  return (
    <section id="tours" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-safari-charcoal font-serif text-3xl font-normal mb-4">Explore The Wild</h2>
          <p className="text-safari-charcoal/80 max-w-3xl mx-auto text-sm">
            Embark deep into Sri Lanka&apos;s wildlife with our exceptional guided safaris, tailored for every type of traveler. 
            From sunrise to sunset, discover breathtaking natural landscapes and the untouched beauty of nature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tours.map(tour => (
            <TourCard
              key={tour.id}
              image={tour.image}
              title={tour.title}
              duration={tour.duration}
              time={tour.time}
              maxPeople={tour.maxPeople}
              price={tour.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
