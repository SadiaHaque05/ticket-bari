import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const Home = () => {
  const [advertisedTickets, setAdvertisedTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/tickets?advertised=true`)
      .then((res) => {
        const data = res.data;
        let ticketsArray = [];
        if (Array.isArray(data)) {
          ticketsArray = data;
        } else if (Array.isArray(data.tickets)) {
          ticketsArray = data.tickets;
        } else {
          console.warn("Unexpected API response:", data);
        }
        setAdvertisedTickets(ticketsArray.slice(0, 6));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="space-y-20 px-6 md:px-12">

      {/* Banner */}
      <section className="relative h-96 w-full mt-8 rounded-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1350&q=80"
          alt="Hero Banner"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Explore the World with Ease
          </h1>
          <p className="text-lg md:text-2xl mb-6 drop-shadow-md">
            Book verified tickets and enjoy safe, comfortable travel
          </p>
          <button
            onClick={() => navigate("/tickets")}
            className="bg-lime-500 hover:bg-lime-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
          >
            Browse Tickets
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl text-lime-300 font-bold mb-6 border-l-4 border-lime-500 pl-3">
          Advertised Tickets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {advertisedTickets.length > 0 ? (
            advertisedTickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white text-lime-300 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1">{ticket.title}</h3>
                  <p className="text-gray-600">Price: ${ticket.price}</p>
                  <p className="text-gray-600">Quantity: {ticket.quantity}</p>
                  <p className="text-gray-600">Transport: {ticket.transportType}</p>
                  <p className="text-gray-600">
                    Perks: {ticket.perks?.join(", ")}
                  </p>
                  <button
                    onClick={() => navigate(`/ticket/${ticket._id}`)}
                    className="mt-3 w-full bg-lime-500 hover:bg-lime-600 text-white py-2 rounded font-semibold transition"
                  >
                    See Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No advertised tickets available</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-3xl text-lime-300 font-bold mb-6 border-l-4 border-lime-500 pl-3">
          Latest Tickets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {advertisedTickets.length > 0 ? (
            advertisedTickets.slice(0, 6).map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white text-lime-300 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1">{ticket.title}</h3>
                  <p className="text-gray-600">Price: ${ticket.price}</p>
                  <p className="text-gray-600">Quantity: {ticket.quantity}</p>
                  <p className="text-gray-600">Transport: {ticket.transportType}</p>
                  <p className="text-gray-600">
                    Perks: {ticket.perks?.join(", ")}
                  </p>
                  <button
                    onClick={() => navigate(`/ticket/${ticket._id}`)}
                    className="mt-3 w-full bg-lime-500 hover:bg-lime-600 text-white py-2 rounded font-semibold transition"
                  >
                    See Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No latest tickets available</p>
          )}
        </div>
      </section>

      <section className="bg-gray-50 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl text-lime-300 font-bold mb-6 border-l-4 border-lime-500 pl-3">
          Popular Routes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white text-lime-400 rounded shadow flex items-center gap-2">
            Dhaka → Chittagong
          </div>
          <div className="p-4 bg-white text-lime-400 rounded shadow flex items-center gap-2">
            Dhaka → Sylhet
          </div>
          <div className="p-4 bg-white text-lime-400 rounded shadow flex items-center gap-2">
            Dhaka → Khulna
          </div>
        </div>
      </section>

      <section className="relative bg-lime-500 text-white rounded-lg p-12 shadow-xl overflow-hidden">
        <h2 className="text-3xl font-bold mb-6 border-l-4 border-white pl-3">
          Why Choose Us?
        </h2>
        <p className="text-lg md:text-xl mb-6 max-w-3xl">
          Experience hassle-free travel with verified tickets, instant booking, and
          secure payments. Our platform ensures every journey is smooth, safe, and
          memorable. With exclusive perks and top-rated transport, your adventure
          starts the moment you book with us.
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white text-lime-500 font-semibold px-4 py-2 rounded shadow">
            Verified Tickets
          </div>
          <div className="bg-white text-lime-500 font-semibold px-4 py-2 rounded shadow">
            Secure Payments
          </div>
          <div className="bg-white text-lime-500 font-semibold px-4 py-2 rounded shadow">
            Best Prices
          </div>
          <div className="bg-white text-lime-500 font-semibold px-4 py-2 rounded shadow">
            Top-rated Transport
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;