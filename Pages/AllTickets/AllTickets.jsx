import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/tickets`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        const approvedTickets = data.filter(
          (ticket) => ticket.verificationStatus === "approved"
        );
        setTickets(approvedTickets);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load tickets", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading tickets...</p>;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-10 py-10">
      <h2 className="text-3xl font-bold text-lime-500 mb-8 border-l-4 border-lime-500 pl-3">
        All Tickets
      </h2>

      {tickets.length === 0 ? (
        <p className="text-gray-500">No tickets available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
            >
              {/* Image */}
              <img
                src={ticket.image}
                alt={ticket.title}
                className="w-full h-48 object-cover"
              />

              {/* Content */}
              <div className="p-4 space-y-1">
                <h3 className="text-xl font-semibold text-gray-800">
                  {ticket.title}
                </h3>

                <p className="text-gray-600">
                  {ticket.from} → {ticket.to}
                </p>

                <p className="text-gray-600">
                  Transport: {ticket.transportType}
                </p>

                <p className="text-gray-600">Price: ৳{ticket.price}</p>

                <p className="text-gray-600">Quantity: {ticket.quantity}</p>

                <p className="text-gray-600">
                  Perks: {ticket.perks?.join(", ")}
                </p>

                <p className="text-gray-600">
                  Departure: {new Date(ticket.departureTime).toLocaleString()}
                </p>

                <button
                  onClick={() => navigate(`/ticket/${ticket._id}`)}
                  className="mt-3 w-full bg-lime-500 hover:bg-lime-600 text-white py-2 rounded font-semibold transition"
                >
                  See Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTickets;
