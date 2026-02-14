import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Countdown from "react-countdown";
import { IoTicketSharp } from "react-icons/io5";

const TicketDetails = ({ userEmail }) => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [bookingMessage, setBookingMessage] = useState("");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/tickets/${id}`);
        setTicket(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load ticket");
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  if (loading) return <p>Loading ticket...</p>;
  if (error) return <p>{error}</p>;
  if (!ticket) return null;

  const departureTime = new Date(ticket.departure || Date.now() + 3600 * 1000);
  const isExpired = new Date() > departureTime || ticket.quantity === 0;

  const handleBooking = async () => {
    if (!userEmail) {
      alert("Please login to book a ticket.");
      return;
    }

    if (quantity < 1 || quantity > ticket.quantity) {
      alert("Invalid quantity selected.");
      return;
    }

    try {
      const booking = {
        ticketId: ticket._id,
        userEmail,
        ticketTitle: ticket.title,
        quantity: Number(quantity),
        totalPrice: Number(quantity) * ticket.price,
        status: "pending",
        bookedAt: new Date(),
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, booking);
      setBookingMessage("Booking successful! Check 'My Booked Tickets'.");
      setShowModal(false);
      setQuantity(1); 
    } catch (err) {
      console.error(err);
      setBookingMessage("Booking failed. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pt-30 px-6 md:px-12">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-md"
        />
        <div className="flex-1 space-y-2">
          <h2 className="text-3xl font-bold text-lime-600">{ticket.title}</h2>
          <p className="text-gray-700">Price: ${ticket.price}</p>
          <p className="text-gray-700">Quantity Available: {ticket.quantity}</p>
          <p className="text-gray-700">
            From: {ticket.from} → To: {ticket.to}
          </p>
          <p className="text-gray-700">Transport: {ticket.transportType}</p>
          <p className="text-gray-700">Perks: {ticket.perks?.join(", ")}</p>
          <p className="text-gray-700">
            Departure: {departureTime.toLocaleString()}
          </p>

          {!isExpired && (
            <div className="text-red-500 font-semibold">
              Departure in: <Countdown date={departureTime} />
            </div>
          )}

          <button
            disabled={isExpired}
            onClick={() => setShowModal(true)}
            className={`mt-4 px-6 py-2 rounded-lg text-white font-semibold shadow-md transition ${
              isExpired
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-lime-500 hover:bg-lime-600"
            }`}
          >
            {isExpired ? "Unavailable" : "Book Now"}
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
            <h3 className="text-xl font-bold text-lime-500 mb-4">Book {ticket.title}</h3>

            <label className="block mb-2 text-yellow-400 font-semibold">Quantity:</label>
            <input
              type="number"
              min="1"
              max={ticket.quantity}
              value={quantity}
              onChange={(e) => {
                let val = Number(e.target.value);
                if (val > ticket.quantity) val = ticket.quantity;
                if (val < 1) val = 1;
                setQuantity(val);
              }}
              className="w-full border-lime-400 text-orange-300 border px-3 py-2 rounded mb-4"
            />

            <p className="mb-4 text-lime-400 font-semibold">
              Total Price: ${Number(quantity) * ticket.price}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded text-red-500 bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                disabled={quantity < 1 || quantity > ticket.quantity}
                className="px-4 py-2 rounded bg-lime-500 hover:bg-lime-600 text-white transition disabled:opacity-50"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {bookingMessage && (
        <p className="text-green-600 font-semibold mt-4">{bookingMessage}</p>
      )}
    </div>
  );
};

export default TicketDetails;