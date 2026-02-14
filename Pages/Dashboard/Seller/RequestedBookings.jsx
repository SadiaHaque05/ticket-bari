import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../../components/shared/Button/Button";

const RequestedBookings = ({ vendorEmail }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
         `${import.meta.env.VITE_API_URL}/bookings/vendor/${vendorEmail}`
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

  const handleAction = async (id, action) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/bookings/${id}`, {
        status: action,
      });
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(`Failed to ${action} booking:`, err);
    }
  };

  if (loading) return <p>Loading bookings...</p>;

  if (!bookings.length)
    return <p className="text-lime-300">No booking requests at the moment.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">User Name/Email</th>
            <th className="p-3 border">Ticket Title</th>
            <th className="p-3 border">Quantity</th>
            <th className="p-3 border">Total Price</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className="text-center border-b">
              <td className="p-2">{b.user.name} / {b.user.email}</td>
              <td className="p-2">{b.ticketTitle}</td>
              <td className="p-2">{b.quantity}</td>
              <td className="p-2">{b.totalPrice}</td>
              <td className="p-2 flex justify-center gap-2">
                <Button
                  label="Accept"
                  onClick={() => handleAction(b._id, "accepted")}
                  className="bg-green-400 hover:bg-green-600 text-white"
                />
                <Button
                  label="Reject"
                  onClick={() => handleAction(b._id, "rejected")}
                  className="bg-red-400 hover:bg-red-600 text-white"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestedBookings;
