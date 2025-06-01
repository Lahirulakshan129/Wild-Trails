export default function ActivitiesSection() {
  const activities = [
    {
      id: 1,
      image: 'src/assets/kudumbigala.JPG',
      title: 'Kudumbigala Rock',
      description: 'Spot exotic wildlife species in their natural habitat'
    },
    {
      id: 2,
      image: 'src/assets/Lagoon_Boat_Tour.jpg',
      title: 'Lagoon Boat Tour',
      description: 'Experience the wilderness with premium comfort'
    },
    {
      id: 3,
      image: 'src/assets/Arugambay.webp',
      title: 'Surfing in Arugam Bay',
      description: 'Explore beautiful coastal areas'
    },
    {
      id: 4,
      image: 'src/assets/cooking_class.webp',
      title: 'Cooking Class',
      description: 'Learn to prepare authentic Sri Lankan cuisine'
    }
  ];

  return (
    <section id="activities" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-safari-charcoal font-caveat text-4xl font-normal mb-2">Unforgettable Activities</h2>
          <p className="text-safari-charcoal/80 max-w-3xl mx-auto text-sm">
            The adventures doesn't stop with the safari alone.
          </p>
          <p className="text-safari-charcoal/80 max-w-2xl mx-auto text-sm mt-2">
            Make the most of your time in Sri Lankan region with unique cultural and adventure experiences.
            From birdwatching and water tours, visits to sacred forest sites and trekking to local attractions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activities.map(activity => (
            <div key={activity.id} className="bg-white rounded-lg overflow-hidden border border-gray-200">
              <div className="relative h-36 overflow-hidden">
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3 text-center">
                <h3 className="font-serif text-base font-medium text-safari-charcoal mb-1">{activity.title}</h3>
                <p className="text-safari-charcoal/80 text-xs mb-2">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a 
            href="/#contact" 
            className="bg-safari-green hover:bg-safari-light-green text-white px-6 py-2 rounded-full text-sm font-medium transition-colors inline-block"
          >
            Plan My Holiday
          </a>
        </div>
      </div>
    </section>
  );
}
