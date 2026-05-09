import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-2xl px-6 py-16 mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-500">We'd love to hear from you</p>
        </div>

        <div className="p-10 bg-white shadow-md rounded-2xl">
          {/* Contact Info */}
          <div className="mb-10 space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-2xl">✉️</span>
              <div>
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-blue-600">contact@shelfex.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-medium text-gray-900">Location</p>
                <p className="text-gray-500">Addis Ababa, Ethiopia</p>
              </div>
            </div>
          </div>

          <hr className="mb-10 border-gray-100" />

          {/* Contact Form — UI only */}
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Send A Message
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full px-4 py-3 text-sm border border-gray-200 resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="w-full py-3 font-bold text-white transition bg-slate-900 rounded-xl hover:bg-slate-800">
              Send Message
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
