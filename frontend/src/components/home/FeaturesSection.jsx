export default function FeaturesSection() {
  const features = [
    {
      icon: <img src="src/assets/airport.png" alt="Airport tag" className="w-20 h-20" />,
      title: 'Modern Transports',
      description: 'Airport Transport'
    },
    {
      icon: <img src="src/assets/surf-icon.jpg" alt="Boat" className="w-20 h-20" />,
      title: 'Expert Tour Guides',
      description: 'Arugam Bay connections'
    },
    {
      icon: <img src="src/assets/private-tours.png" alt="Map" className="w-20 h-20" />,
      title: 'Private Tours',
      description: 'Private Tours'
    },
    {
      icon: <img src="src/assets/rickshaw.png" alt="TukTuk" className="w-20 h-20" />,
      title: 'Full Day Trip',
      description: 'Tuk Tuk Hire'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-safari-charcoal font-caveat text-4xl font-normal mb-2">Travel with Comfort</h2>
          <p className="font-aref font-bold text-safari-charcoal/80 max-w-2xl mx-auto text-sm">
            Seamless and reliable transport to make your journey as smooth as your safari. 
          </p>
          <p className="font-aref text-safari-charcoal/80 max-w-2xl mx-auto text-sm">
            From airport pickups to luxury private tours and top safety, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4  rounded-full w-20 h-20 mx-auto items-center">
                {feature.icon}
              </div>
              <h3 className="font-serif text-base font-medium mb-1">{feature.title}</h3>
              <p className="font-aref bg-[#C6E3B3] mx-8 py-1 rounded-xl text-safari-charcoal/80 text-base">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a 
            href="/#contact" 
            className="font-aref bg-safari-green hover:bg-safari-light-green text-[#0D722A] px-6 py-2 rounded-full text-base font-medium transition-colors inline-block"
          >
            Hire now &gt;&gt;&gt;
          </a>
        </div>
      </div>
    </section>
  );
}
