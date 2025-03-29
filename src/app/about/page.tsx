export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About CraftHub</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering artisans, preserving traditions, and connecting communities through handmade crafts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            CraftHub is dedicated to preserving traditional crafts and supporting local artisans by providing them with a platform to showcase their work and connect with customers worldwide.
          </p>
          <p className="text-gray-600">
            We believe that every handmade piece tells a story and carries the rich cultural heritage of its creator. Our mission is to ensure these stories continue to be told for generations to come.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-gray-600 mb-4">
            We envision a world where traditional crafts thrive alongside modern innovation, where artisans are celebrated for their skills and creativity, and where consumers value the unique stories behind each handmade piece.
          </p>
          <p className="text-gray-600">
            Through our platform, we aim to create sustainable livelihoods for artisans while preserving cultural heritage and promoting sustainable consumption.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Preservation</h3>
            <p className="text-gray-600">
              We are committed to preserving traditional crafts and techniques, ensuring they are passed down to future generations.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
            <p className="text-gray-600">
              We promote sustainable practices in craft production and consumption, supporting both artisans and the environment.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
            <p className="text-gray-600">
              We foster a global community of artisans and craft enthusiasts, creating connections that transcend borders.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Join Our Journey</h2>
        <p className="text-gray-600 mb-6">
          Whether you're an artisan looking to showcase your work, a customer seeking unique handmade pieces, or someone passionate about preserving traditional crafts, there's a place for you in the CraftHub community.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Register as an Artisan
          </a>
          <a
            href="/contact"
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
} 