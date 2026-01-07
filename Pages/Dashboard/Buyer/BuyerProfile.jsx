import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoPersonCircle } from "react-icons/io5";
import useAuth from "../../../hooks/useAuth";
import Container from "../../../components/shared/Container";

const BuyerProfile = () => {
  const { user } = useAuth(); 
  const [buyer, setBuyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.email) {
      setError("User email not available. Please login.");
      setLoading(false);
      return;
    }

    const fetchBuyer = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/users/${user.email}`
        );
        setBuyer(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load user info");
      } finally {
        setLoading(false);
      }
    };

    fetchBuyer();
  }, [user]);

  if (loading) return <p className="text-lime-400">Loading user profile...</p>;
  if (error) return <p className="text-red-500 font-semibold">{error}</p>;
  if (!buyer) return <p className="text-lime-400">No user data found.</p>;

  return (
    <div className="max-w-4xl min-h-screen  flex items-center justify-center mr-55 mx-auto p-6 bg-white rounded-xl shadow-lg">
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            {buyer.profilePicture ? (
              <img
                src={buyer.profilePicture}
                alt={buyer.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-lime-500"
              />
            ) : (
              <IoPersonCircle className="w-32 h-32 text-lime-500" />
            )}
          </div>

          <div className="flex-1 space-y-2">
            <h2 className="text-3xl font-bold text-lime-600">{buyer.name}</h2>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {buyer.email}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Role:</span>{" "}
              <span className="capitalize">{buyer.role}</span>
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Joined:</span>{" "}
              {new Date(buyer.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button className="bg-lime-500 hover:bg-lime-600 text-white px-5 py-2 rounded-lg shadow-md transition">
            Edit Profile
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg shadow-md transition">
            Change Password
          </button>
        </div>
      </Container>
    </div>
  );
};

export default BuyerProfile;
