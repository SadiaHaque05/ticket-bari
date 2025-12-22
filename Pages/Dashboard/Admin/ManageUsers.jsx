import { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/users");
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const makeAdmin = async (id) => {
    try {
      await axios.put(`http://localhost:3000/admin/users/make-admin/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Failed to make admin:", error);
    }
  };

  const makeVendor = async (id) => {
    try {
      await axios.put(`http://localhost:3000/admin/users/make-vendor/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Failed to make vendor:", error);
    }
  };

  const markFraud = async (id) => {
    try {
      await axios.put(`http://localhost:3000/admin/users/mark-fraud/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Failed to mark fraud:", error);
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl text-blue-600 font-bold mb-5">Manage Users</h2>
      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className=" text-yellow-800 border px-3 py-2">Name</th>
            <th className="text-yellow-800 border px-3 py-2">Email</th>
            <th className="text-yellow-800 border px-3 py-2">Role</th>
            <th className="text-yellow-800 border px-3 py-2">Fraud</th>
            <th className="text-yellow-800 border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="text-blue-400 border px-3 py-2">{user.name}</td>
              <td className="text-blue-400 border px-3 py-2">{user.email}</td>
              <td className="text-blue-400 border px-3 py-2">{user.role}</td>
              <td className="text-blue-400 border px-3 py-2">{user.isFraud ? "Yes" : "No"}</td>
              <td className="text-blue-400 border px-3 py-2 flex gap-2">
                {user.role !== "admin" && (
                  <button
                    onClick={() => makeAdmin(user._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Make Admin
                  </button>
                )}
                {user.role !== "vendor" && (
                  <button
                    onClick={() => makeVendor(user._id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Make Vendor
                  </button>
                )}
                {user.role === "vendor" && !user.isFraud && (
                  <button
                    onClick={() => markFraud(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Mark as Fraud
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;