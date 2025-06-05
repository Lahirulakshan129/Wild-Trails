import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-safari-charcoal font-caveat text-3xl font-normal mb-2">Contact Us</h2>
          <p className="text-safari-charcoal/80 max-w-2xl mx-auto text-sm">
            Have questions or ready to book your adventure? Reach out to us and we'll help you plan your perfect Sri Lankan safari experience.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
          {/* Contact Form */}
          <div className="md:w-2/3">
            <h3 className="font-serif text-xl font-medium mb-4 text-safari-green">Send Us a Message</h3>

            <form className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-safari-green text-safari-charcoal text-sm"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-safari-green text-safari-charcoal text-sm"
                    placeholder="Email Address"
                  />
                </div>
              </div>

              <div>
                <textarea 
                  id="message" 
                  rows="4"
                  className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-safari-green text-safari-charcoal text-sm"
                  placeholder="Your Message"
                ></textarea>
              </div>

              <div className="text-center">
                <button 
                  type="submit" 
                  className="bg-safari-green text-white font-medium px-6 py-2 rounded-full hover:bg-safari-light-green transition-colors text-sm"
                >
                  Chat with Kumara
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="md:w-1/3 bg-gray-50 p-6 rounded">
            <h3 className="font-serif text-xl font-medium mb-4 text-safari-green">Contact Info</h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <Phone size={16} className="mr-3 mt-1 text-safari-green" />
                <div>
                  <p className="text-sm">+94 76 661 1421</p>
                  <p className="text-sm">+94 76 338 1942</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail size={16} className="mr-3 mt-1 text-safari-green" />
                <div>
                  <p className="text-sm">info@wildtrailssafari.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin size={16} className="mr-3 mt-1 text-safari-green" />
                <div>
                  <p className="text-sm">42 Wildlife Avenue</p>
                  <p className="text-sm">Habarana, Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
