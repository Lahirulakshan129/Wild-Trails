import { Link } from 'react-router-dom'; // if using react-router-dom

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 bg-black">
        <img 
          src="src/assets/sri-lanka-elephants.jpg" // Replace with your local path or external URL
          alt="Sri Lankan Elephant in natural habit"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

      {/* Hero Content */}
      <div className="relative container px-8 h-full flex flex-col justify-center text-white">
        <div className="max-w-2xl">
          <h1 className="font-caveat text-6xl font-bold  md:text-6xl font-normal mb-3 leading-tight">
            Discover your wild side<br />
            Explore the diverse cultures<br />
            and wildlife of Sri Lanka
          </h1>
          <a 
            href="#tours" 
            className="bg-white hover:bg-safari-gold text-black px-6 py-2 rounded text-sm font-medium transition-colors inline-block"
          >
            Explore Tours
          </a>
        </div>
      </div>
    </section>
  );
}
