export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-safari-charcoal font-serif text-3xl font-normal mb-2">Who We Are</h2>
          <p className="text-safari-charcoal/80 max-w-2xl mx-auto text-sm">
            More than a tour company, we're a team of passionate locals dedicated to sharing the authentic 
            spirit of Sri Lanka's wildlife and culture. We are local, organic, and ethical.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-safari-charcoal text-sm leading-relaxed mb-4">
            Wild Trails began with a small group of enthusiastic locals. Even now we remain a small entity — this is how we prefer to stay. 
            We aim to provide authentic, intimate travel experiences, not mass-produced tours. Our guides are all locals with deep knowledge of the terrain, wildlife, and cultural heritage of Sri Lanka.
          </p>

          <p className="text-safari-charcoal text-sm leading-relaxed mb-4">
            Every tour we deliver is designed to promote responsible tourism by educating visitors about wildlife conservation and supporting local communities. 
            Join us and feel that you've made friends, not just hired a guide. You won't just learn about Sri Lanka; you'll fall in love with it.
          </p>
        </div>

        <div className="mt-10">
          <h3 className="text-center font-serif text-2xl text-safari-charcoal mb-6">Our Story</h3>

          <div className="flex flex-col md:flex-row items-center max-w-4xl mx-auto">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <img 
                src="" 
                alt="Kumara Bandara" 
                className="w-48 h-48 object-cover rounded-full mx-auto border-4 border-safari-green"
              />
            </div>

            <div className="md:w-2/3 md:pl-8">
              <h3 className="font-serif text-xl font-medium text-safari-charcoal mb-1">Meet Kumara</h3>
              <h4 className="font-serif text-base text-safari-green mb-3">Your Host and Kunming Insider</h4>

              <p className="text-safari-charcoal leading-relaxed text-sm mb-3">
                Hello! I'm Kumara Bandara, the founder and driving force behind Wild Trails Safari Tours. 
                Born and raised in the shadow of Sri Lanka's magnificent natural parks, I've spent my life exploring every corner of this island paradise. 
                My passion for wildlife and conservation led me to create Wild Trails — not just as a business, but as a mission.
              </p>

              <p className="text-safari-charcoal leading-relaxed text-sm">
                I pride on providing a genuine connection between you and my homeland. With over 15 years of experience as a naturalist guide, 
                I personally lead many of our tours and train our small team of expert guides to ensure each guest receives an unforgettable experience.
              </p>

              <div className="mt-4">
                <a 
                  href="/#contact" 
                  className="bg-safari-green hover:bg-safari-light-green text-white px-5 py-2 rounded-full text-sm font-medium transition-colors inline-block"
                >
                  Chat with Kumara
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
