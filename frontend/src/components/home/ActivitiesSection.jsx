export default function ActivitiesSection() {
  const activities = [
    {
      id: 1,
      image: "src/assets/kudumbigala.JPG",
      title: "Kudumbigala Rock",
    },
    {
      id: 2,
      image: "src/assets/Lagoon_Boat_Tour.jpg",
      title: "Lagoon Boat Tour",
    },
    {
      id: 3,
      image: "src/assets/Arugambay.webp",
      title: "Surfing in Arugam Bay",
    },
    {
      id: 4,
      image: "src/assets/cooking_class.webp",
      title: "Cooking Class",
    },
  ];

  return (
    <section id="activities" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-safari-charcoal font-caveat text-4xl font-normal mb-2">
            Unforgettable Activities
          </h2>
          <p className="font-aref font-bold text-safari-charcoal/80 max-w-3xl mx-auto text-sm">
            The adventure doesn't end with the safari!
          </p>
          <p className="font-aref text-safari-charcoal/80 max-w-2xl mx-auto text-sm mt-2">
            Make the most of your time in the Kumana region with unique cultural
            and adventure experiences. From ancient temples and scenic rock
            climbs to serene boat rides and hands-on local cooking,
          </p>
        </div>

        {/* Activity Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {activities.map((activity) => (
            <div key={activity.id} className="text-center">
              <img
                src={activity.image}
                alt={activity.title}
                className="w-64 h-80 object-cover rounded-[2rem] mx-auto shadow-md"
              />
              <div className="mt-4">
                <div className="w-64 mx-auto bg-[#C6E3B3] text-safari-charcoal/80 text-sm font-aref px-4 py-2 rounded-full font-medium">
                  {activity.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-10">
          <a
            href="/#contact"
            className="font-aref bg-safari-green hover:bg-safari-light-green text-[#0D722A] px-6 py-2 rounded-full text-base font-medium transition-colors inline-block"
          >
            Plan MY Holiday &gt;&gt;&gt;&gt;
          </a>
        </div>
      </div>
    </section>
  );
}
