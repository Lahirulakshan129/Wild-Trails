import TourCard from './TourCard';

export default function ToursSection() {
  const tours = [
    {
      id: 1,
      image: '/src/assets/image1.jpeg', // Updated path
      title: 'Morning Safari',
      time: '6.00 am to 11.00 am',
      duration: '5 hours',
      maxPeople: 10,
    },
    {
      id: 2,
      image: '/src/assets/image2.jpg', // Updated path
      title: 'Full Day Safari',
      time: '6.00 am to 4.00 pm',
      duration: '10 hours',
      maxPeople: 10,
    },
    {
      id: 3,
      image: '/src/assets/image3.jpg', // Updated path
      title: 'Evening Safari',
      time: '2.00 pm to 5.00 pm',
      duration: '3 hours',
      maxPeople: 10,
    }
  ];

  return (
    <section id="tours" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-safari-charcoal font-caveat text-4xl font-normal mb-4">Explore The Wild</h2>
          <div className="max-w-3xl mx-auto">
            <p className="font-aref font-bold text-safari-charcoal/80 mb-2">
              Venture deep into Kumana's wild heart with our expertly guided safaris, tailored for every type of explorer.
            </p>
            <p className="font-aref text-safari-charcoal/80">
              From sunrise to sunset, discover breathtaking wildlife encounters and the untouched beauty of nature.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tours.map(tour => (
            <TourCard
              key={tour.id}
              image={tour.image}
              title={tour.title}
              time={tour.time}
              duration={tour.duration}
              maxPeople={tour.maxPeople}
            />
          ))}
        </div>
      </div>
    </section>
  );
}