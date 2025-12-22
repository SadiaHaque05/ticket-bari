import { Link } from "react-router";
import { IoTicketSharp } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 mt-10">
      <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Logo + Description */}
        <div className="flex flex-col items-start">
          <Link to="/" className="flex items-center gap-1 text-gray-900 font-bold mb-2">
            <IoTicketSharp size={24} />
            <p>TicketBari</p>
          </Link>
          <p className="text-gray-600">
            Book bus, train, launch & flight tickets easily.
          </p>
        </div> 

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="hover:text-lime-500">Home</Link>
            </li>
            <li>
              <Link to="/all-tickets" className="hover:text-lime-500">All Tickets</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-lime-500">Contact Us</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-lime-500">About</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="font-semibold mb-2">Contact Info</h3>
          <ul className="space-y-1 text-gray-600">
            <li>Email: support@ticketbari.com</li>
            <li>Phone: +880 1234 567890</li>
            <li>
              <a href="https://facebook.com/ticketbari" target="_blank" rel="noreferrer" className="hover:text-lime-500">
                Facebook Page
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Payment Methods */}
        <div>
          <h3 className="font-semibold mb-2">Payment Methods</h3>
          <ul className="flex gap-2 items-center">
            <li>
              <img src="/images/stripe.png" alt="Stripe" className="h-8" />
            </li>
            {/* Add more payment logos if needed */}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-200 text-center py-3 mt-5 text-gray-600 text-sm">
        © 2025 TicketBari. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;