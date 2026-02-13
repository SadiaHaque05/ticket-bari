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
    <div className="max-w-3xl mx-auto p-4 md:p-6 bg-white shadow-xl rounded-lg mt-10">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
          {admin?.photoURL ? (
            <img
              src={admin.photoURL}
              alt={admin.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <IoPersonCircle size={96} className="text-gray-400 md:text-gray-400" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 w-full md:w-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-lime-500 mb-1 text-center md:text-left">
            {admin?.name}
          </h2>
          <p className="text-gray-700 mb-1 text-center md:text-left">
            <span className="font-semibold">Email:</span> {admin?.email}
          </p>
          <p className="text-gray-700 mb-1 text-center md:text-left">
            <span className="font-semibold">Role:</span> {admin?.role}
          </p>
          <p className="text-gray-700 mb-2 text-center md:text-left">
            <span className="font-semibold">Joined:</span>{" "}
            {new Date(admin?.createdAt).toLocaleDateString()}
          </p>

          <div className="mt-2 flex gap-2 overflow-x-auto md:overflow-x-visible py-1">
            <div className="flex-shrink-0 px-3 py-1 bg-lime-100 text-lime-700 rounded shadow text-sm">
              Admin Dashboard Access
            </div>
            <div className="flex-shrink-0 px-3 py-1 bg-lime-100 text-lime-700 rounded shadow text-sm">
              Manage Users & Tickets
            </div>
            <div className="flex-shrink-0 px-3 py-1 bg-lime-100 text-lime-700 rounded shadow text-sm">
              Advertise Tickets
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;