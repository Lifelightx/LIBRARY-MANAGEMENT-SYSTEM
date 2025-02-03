import React from 'react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse Books', path: '/books' },
    { name: 'My Account', path: '/account' },
    { name: 'Reading Lists', path: '/reading-lists' },
    { name: 'Library Hours', path: '/hours' }
  ];

  return (
    <footer className="bg-indigo-600 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">About Our Library</h3>
            <p className="text-gray-200 text-sm leading-relaxed">
              Nurturing minds and fostering learning through our extensive collection of books and digital resources. Your gateway to knowledge and discovery.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-gray-200 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="text-gray-200 space-y-2 text-sm">
              <p>Central Library Building</p>
              <p>123 Knowledge Street</p>
              <p className="hover:text-white">
                <a href="tel:+916371317325">+91 6371317325</a>
              </p>
              <p className="hover:text-white">
                <a href="mailto:help@library.com">help@library.com</a>
              </p>
            </div>
          </div>

          {/* Library Hours Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Library Hours</h3>
            <div className="text-gray-200 space-y-2 text-sm">
              <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
              <p>Saturday: 10:00 AM - 6:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-blue-700 mt-8 pt-8 text-center text-sm text-gray-200">
          <p>
            © {new Date().getFullYear()} Library Management System. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;