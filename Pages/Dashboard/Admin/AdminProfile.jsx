import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoPersonCircle } from "react-icons/io5";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const adminEmail = "admin@ticketbari.com";

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/users/${adminEmail}`);
        setAdmin(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load admin data");
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  if (loading) return <p className="text-gray-500 text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Profile */}
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {admin?.photoURL ? (
            <img
              src={admin.photoURL}
              alt={admin.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <IoPersonCircle size={120} className="text-gray-400" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-lime-500 mb-2">{admin?.name}</h2>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Email:</span> {admin?.email}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Role:</span> {admin?.role}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Joined:</span>{" "}
            {new Date(admin?.createdAt).toLocaleDateString()}
          </p>

          {/* Additional Info */}
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="px-4 py-2 bg-lime-100 text-lime-700 rounded shadow">
              Admin Dashboard Access
            </div>
            <div className="px-4 py-2 bg-lime-100 text-lime-700 rounded shadow">
              Manage Users & Tickets
            </div>
            <div className="px-4 py-2 bg-lime-100 text-lime-700 rounded shadow">
              Advertise Tickets
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;