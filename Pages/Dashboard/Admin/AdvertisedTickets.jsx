import { useEffect, useState } from "react";
import axios from "axios";

const AdvertiseTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/tickets"); 
      setTickets(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load tickets");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const toggleAdvertise = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3000/admin/tickets/advertise/${id}`);
      if (res.data.success) {
        setTickets((prev) =>
          prev.map((t) =>
            t._id === id ? { ...t, advertised: res.data.advertised } : t
          )
        );
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to toggle advertise");
    }
  };

  if (loading) return <p>Loading tickets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl text-lime-500 font-bold mb-5">Advertise Tickets</h2>
      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-lime-500 px-3 py-2">Title</th>
            <th className="text-lime-500 px-3 py-2">Vendor</th>
            <th className="text-lime-500 px-3 py-2">Price</th>
            <th className="text-lime-500 px-3 py-2">Quantity</th>
            <th className="text-lime-500 px-3 py-2">Transport</th>
            <th className="text-lime-500 px-3 py-2">Advertised</th>
            <th className="text-lime-500 px-3 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td className="text-orange-500 border px-3 py-2">{ticket.title}</td>
              <td className="text-orange-500 border px-3 py-2">{ticket.vendor.name}</td>
              <td className="text-orange-500 border px-3 py-2">{ticket.price}</td>
              <td className="text-orange-500 border px-3 py-2">{ticket.quantity}</td>
              <td className="text-orange-500 border px-3 py-2">{ticket.transportType}</td>
              <td className="text-orange-500 border px-3 py-2">{ticket.advertised ? "Yes" : "No"}</td>
              <td className="text-orange-500 border px-3 py-2">
                <button
                  onClick={() => toggleAdvertise(ticket._id)}
                  className={`px-3 py-1 rounded text-white ${
                    ticket.advertised
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {ticket.advertised ? "Unadvertise" : "Advertise"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvertiseTickets;