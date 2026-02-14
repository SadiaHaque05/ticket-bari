import { useEffect, useState } from "react";
import axios from "axios";

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/tickets`);
      setTickets(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put( `${import.meta.env.VITE_API_URL}/admin/tickets/approve/${id}`);
      fetchTickets();
    } catch (error) {
      console.error("Failed to approve ticket:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/admin/tickets/reject/${id}`);
      fetchTickets();
    } catch (error) {
      console.error("Failed to reject ticket:", error);
    }
  };

  if (loading) return <p>Loading tickets...</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl text-lime-500 font-bold mb-5">Manage Tickets</h2>
      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-purple-400 border px-3 py-2">Title</th>
            <th className="text-purple-400 border px-3 py-2">Vendor Name</th>
            <th className="text-purple-400 border px-3 py-2">Price</th>
            <th className="text-purple-400 border px-3 py-2">Quantity</th>
            <th className="text-purple-400 border px-3 py-2">Transport Type</th>
            <th className="text-purple-400 border px-3 py-2">Status</th>
            <th className="text-purple-400 border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td className=" text-lime-500 border px-3 py-2">{ticket.title}</td>
              <td className="text-lime-500 border px-3 py-2">{ticket.vendor.name}</td>
              <td className="text-lime-500 border px-3 py-2">{ticket.price}</td>
              <td className="text-lime-500 border px-3 py-2">{ticket.quantity}</td>
              <td className="text-lime-500 border px-3 py-2">{ticket.transportType}</td>
              <td className="text-lime-500 border px-3 py-2">{ticket.verificationStatus}</td>
              <td className="text-lime-500 border px-3 py-2 flex gap-2">
                <button
                  onClick={() => handleApprove(ticket._id)}
                  className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(ticket._id)}
                  className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTickets;
