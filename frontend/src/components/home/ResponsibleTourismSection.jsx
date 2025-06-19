export default function ResponsibleTourismSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-aref font-bold text-xl text-black mb-3">
            Responsible Tourism
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
        <p className="font-aref text-center text-safari-charcoal/80 max-w-2xl mx-auto text-sm">“Travel Light. Leave a Legacy”</p>
          <p className="text-safari-charcoal text-sm leading-relaxed mb-4">
            At Wild Trails, we firmly believe ecotourism should protect from nature — not take from it. 
            That's why we follow strict environmental practices in all our operations. Our safari vehicles use modern, low-emission engines, 
            and we adhere to designated trails to minimize habitat disruption. We actively support local conservation efforts 
            by donating a portion of our profits to wildlife protection organizations.
          </p>

          <p className="text-safari-charcoal text-sm leading-relaxed mb-4">
            Our commitment extends beyond the environment to the local communities. We exclusively hire local guides and staff, 
            source our supplies from local businesses, and integrate cultural experiences that benefit traditional villages. 
            This approach ensures that tourism dollars flow directly into the communities that steward these precious ecosystems.
          </p>

          <blockquote className="border-l-4 border-safari-green pl-4 italic text-safari-charcoal text-lg my-6 text-center mx-auto max-w-2xl">
            "We don't just explore nature — it's nature we protect!"
          </blockquote>
        </div>
      </div>
    </section>
  );
}
