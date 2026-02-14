import React, { useEffect, useState } from "react";
import axios from "axios";
import Countdown from "react-countdown";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your_stripe_public_key_here");

const MyBookedTickets = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userEmail = storedUser?.email;

  const fetchBookings = async () => {
    if (!userEmail) {
      console.error("User email not found");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/bookings/user/${userEmail}`
      );
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handlePayment = async (booking) => {
    const departurePassed =
      new Date(booking.departureDateTime) < new Date();

    if (departurePassed) {
      alert("Cannot pay: Departure date has passed");
      return;
    }

    const stripe = await stripePromise;

    try {
      const sessionRes = await axios.post(
         `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        {
          bookingId: booking._id,
          amount: booking.quantity * booking.ticket.price,
        }
      );

      await stripe.redirectToCheckout({
        sessionId: sessionRes.data.sessionId,
      });
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment failed");
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading your bookings...</p>;

  if (!bookings.length)
    return (
      <p className="text-center text-lime-500 mt-10">
        No booked tickets yet.
      </p>
    );

  return (
    <div className="min-h-screen flex justify-center items-start pt-10">
      <div className="w-full max-w-screen-2xl px-4">
        <h2 className="text-3xl font-bold mb-6 text-lime-500 text-center">
          My Booked Tickets
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bookings.map((booking) => {
            const departurePassed =
              new Date(booking.departureDateTime) < new Date();

            return (
              <div
                key={booking._id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={booking.ticket.image}
                  alt={booking.ticket.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-xl font-semibold">
                    {booking.ticket.title}
                  </h3>

                  <p className="text-gray-600">
                    {booking.ticket.from} → {booking.ticket.to}
                  </p>

                  <p className="text-gray-600">
                    Quantity: {booking.quantity}
                  </p>

                  <p className="text-gray-600">
                    Total Price: $
                    {booking.quantity * booking.ticket.price}
                  </p>

                  <p className="text-gray-600">
                    Departure:{" "}
                    {new Date(
                      booking.departureDateTime
                    ).toLocaleString()}
                  </p>

                  <p className="font-semibold">
                    Status:{" "}
                    <span
                      className={
                        booking.status === "pending"
                          ? "text-yellow-500"
                          : booking.status === "accepted"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {booking.status}
                    </span>
                  </p>

                  {booking.status === "accepted" && !departurePassed && (
                    <Countdown
                      date={new Date(booking.departureDateTime)}
                      className="mt-2 font-medium"
                    />
                  )}

                  {booking.status === "accepted" && !departurePassed && (
                    <button
                      onClick={() => handlePayment(booking)}
                      className="mt-3 w-full bg-lime-500 hover:bg-lime-600 text-white py-2 rounded"
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
    </div>
  );
};

export default MyBookedTickets;