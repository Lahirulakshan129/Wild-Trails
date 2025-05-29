export default function FeaturesSection() {
  const features = [
    {
      icon: <img src="/safari-jeep-icon.svg" alt="Safari Jeep" className="w-12 h-12" />,
      title: 'Modern Transports',
      description: 'Safe and comfortable 4x4 jeeps'
    },
    {
      icon: <img src="/tiger-icon.svg" alt="Tiger" className="w-12 h-12" />,
      title: 'Expert Tour Guides',
      description: 'Local wildlife experts'
    },
    {
      icon: <img src="/map-icon.svg" alt="Map" className="w-12 h-12" />,
      title: 'Private Tours',
      description: 'Customized safari itineraries'
    },
    {
      icon: <img src="/hotel-icon.svg" alt="Hotel" className="w-12 h-12" />,
      title: 'Full Day Trip',
      description: 'All-inclusive safari packages'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-safari-charcoal font-serif text-3xl font-normal mb-2">Travel with Comfort</h2>
          <p className="text-safari-charcoal/80 max-w-2xl mx-auto text-sm">
            Experience real comfort designed to make your journey as smooth as possible. 
            From airport pickups to luxury private tours and top safety, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4 bg-black rounded-full w-16 h-16 mx-auto items-center">
                {feature.icon}
              </div>
              <h3 className="font-serif text-base font-medium mb-1">{feature.title}</h3>
              <p className="text-safari-charcoal/80 text-xs">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a 
            href="/#contact" 
            className="bg-safari-green hover:bg-safari-light-green text-white px-6 py-2 rounded-full text-sm font-medium transition-colors inline-block"
          >
            Plan Your Trip
          </a>
        </div>
      </div>
    </section>
  );
}
