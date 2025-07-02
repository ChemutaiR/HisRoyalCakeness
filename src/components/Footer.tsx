import Link from 'next/link';
import { Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-12 text-sm">
        {/* Social Media */}
        <Link href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Instagram">
          <Instagram size={20} />
        </Link>
        {/* Mobile Number */}
        <span className="text-gray-300">Call Us: +123 456 7890</span>
        {/* Copyright */}
        <span className="text-gray-500">&copy; {new Date().getFullYear()} His Royal Cakeness. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer; 