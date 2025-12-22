import React, { useEffect, useState } from "react";
import axios from "axios";
import Countdown from "react-countdown";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your_stripe_public_key_here");

const MyBookedTickets = ({ userEmail }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/bookings/user/${userEmail}`
      );
      setBookings(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [userEmail]);

  const handlePayment = async (booking) => {
    if (new Date(booking.departureDateTime) < new Date()) {
      alert("Cannot pay: Departure date has passed");
      return;
    }

    const stripe = await stripePromise;

    try {
      const sessionRes = await axios.post(
        "http://localhost:3000/create-checkout-session",
        {
          bookingId: booking._id,
          amount: booking.quantity * booking.ticket.price,
        }
      );

      const { sessionId } = sessionRes.data;
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.error("Stripe payment error:", err);
      alert("Payment failed. Please try again.");
    }
  };

  if (loading) return <p>Loading your bookings...</p>;

  if (!bookings.length)
    return <p className="text-center mt-10">No booked tickets yet.</p>;

  return (
    <div className="p-6 max-w-screen-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-lime-500">My Booked Tickets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bookings.map((booking) => {
          const departurePassed =
            new Date(booking.departureDateTime) < new Date();
          return (
            <div
              key={booking._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={booking.ticket.image}
                alt={booking.ticket.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{booking.ticket.title}</h3>
                <p className="text-gray-600">
                  From: {booking.ticket.from} → To: {booking.ticket.to}
                </p>
                <p className="text-gray-600">
                  Booking Quantity: {booking.quantity}
                </p>
                <p className="text-gray-600">
                  Total Price: ${booking.quantity * booking.ticket.price}
                </p>
                <p className="text-gray-600">
                  Departure:{" "}
                  {new Date(booking.departureDateTime).toLocaleString()}
                </p>
                <p className="text-gray-800 font-semibold">
                  Status:{" "}
                  <span
                    className={`${
                      booking.status === "pending"
                        ? "text-yellow-500"
                        : booking.status === "accepted"
                        ? "text-green-500"
                        : booking.status === "rejected"
                        ? "text-red-500"
                        : "text-blue-500"
                    }`}
                  >
                    {booking.status}
                  </span>
                </p>

                {/* Countdown */}
                {booking.status === "accepted" && !departurePassed && (
                  <Countdown
                    date={new Date(booking.departureDateTime)}
                    className="text-gray-700 mt-2 font-medium"
                  />
                )}

                {/* Pay Now button */}
                {booking.status === "accepted" && !departurePassed && (
                  <button
                    onClick={() => handlePayment(booking)}
                    className="mt-3 w-full bg-lime-500 hover:bg-lime-600 text-white py-2 rounded font-semibold transition"
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookedTickets;
