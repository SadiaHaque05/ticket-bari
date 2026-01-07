import React from "react";
import { IoTicketSharp } from "react-icons/io5";
import useAuth from "../../../hooks/useAuth";

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center gap-6 border-b pb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-500">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-3xl text-gray-500">
              {user.name[0].toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name || user.displayName || "User"}</h2>
          <p className="text-gray-600">{user.email}</p>
          <span className="inline-block mt-1 px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full font-semibold">
            {user.role.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Personal Info</h3>
          <p className="text-lime-600"><span className="font-medium text-gray-600">Name:</span> {user.name || user.displayName || "User"}</p>
          <p className="text-lime-600"><span className="font-medium text-gray-600">Email:</span> {user.email}</p>
          <p className="text-lime-600"><span className="font-medium text-gray-600">Role:</span> {user.role}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Account Info</h3>
          <p className="text-lime-600"><span className="font-medium text-gray-600">Joined On:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
          <p className="text-lime-600"><span className="font-medium text-gray-600">Tickets Purchased:</span> {user.ticketsPurchased || 0}</p>
          <p className="text-lime-600"><span className="font-medium text-gray-600">Tickets Sold:</span> {user.ticketsSold || 0}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-4 flex-wrap">
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow">
          <IoTicketSharp />
          My Tickets
        </button>
        <button className="px-4 py-2 border text-indigo-500 border-gray-300 rounded-lg hover:bg-gray-100">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
