import React from 'react';
import { Phone, Mail, MapPin, Clock, Instagram, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/re-pic-Picsart-AiImageEnhancer.jfif" 
                alt="Raviteja Enterprises Logo" 
                className="h-8 w-8 rounded object-cover mr-3"
              />
              <h3 className="text-xl font-bold">Raviteja Enterprises</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted partner for electronics and home needs. Quality products at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/ravitejaenterprisesplk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/category/electronics" className="text-gray-300 hover:text-white">Electronics</a></li>
              <li><a href="/category/furniture" className="text-gray-300 hover:text-white">Furniture</a></li>
              <li><a href="/category/appliances" className="text-gray-300 hover:text-white">Appliances</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-blue-400" />
                <div>
                  <span className="text-gray-300">4-116, Ghanpur Road, Palakurthy - 506252</span>
                  <a 
                    href="https://maps.app.goo.gl/fzXkirmu3YNR3Stn7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-400 hover:text-blue-300 text-sm mt-1"
                  >
                    View on Map <ExternalLink size={12} className="ml-1" />
                  </a>
                </div>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-blue-400" />
                <a href="tel:+919949288805" className="text-gray-300 hover:text-white">
                  +91 9949288805
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-blue-400" />
                <a href="mailto:raju.kurapati95@gmail.com" className="text-gray-300 hover:text-white">
                  raju.kurapati95@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Store Hours</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <Clock size={16} className="mr-2 text-blue-400" />
                <span>All Days: 9:00 AM - 9:00 PM</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h5 className="font-semibold mb-2">Follow Us</h5>
              <a 
                href="https://www.instagram.com/ravitejaenterprisesplk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:text-blue-300"
              >
                <Instagram size={16} className="mr-2" />
                @ravitejaenterprisesplk
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Raviteja Enterprises. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;