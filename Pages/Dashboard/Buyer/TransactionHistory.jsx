import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionHistory = ({ userEmail }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
         `${import.meta.env.VITE_API_URL}/transactions/user/${userEmail}`
        );
        setTransactions(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load transactions");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userEmail]);

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>{error}</p>;
  if (!transactions.length)
    return <p className="text-center text-lime-500 mt-10">No transactions yet.</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl text-lime-500 font-bold mb-5">
        Transaction History
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-lime-400 border px-3 py-2">Transaction ID</th>
              <th className="text-lime-400 border px-3 py-2">Ticket Title</th>
              <th className="text-lime-400 border px-3 py-2">Amount ($)</th>
              <th className="text-lime-400 border px-3 py-2">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn._id}>
                <td className="text-orange-400 border px-3 py-2">
                  {txn.transactionId}
                </td>
                <td className="text-orange-400 border px-3 py-2">
                  {txn.ticketTitle}
                </td>
                <td className="text-orange-400 border px-3 py-2">{txn.amount}</td>
                <td className="text-orange-400 border px-3 py-2">
                  {new Date(txn.paymentDate).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
