import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Container from "../../../components/shared/Container";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";


const MyInventory = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/vendor/revenue/${user.email}`)
      .then(res => res.json())
      .then(setData);
  }, [user]);

  if (!data) {
    return (
      <Container>
        <p className="text-center mt-10 text-lg font-medium">
          Loading revenue data...
        </p>
      </Container>
    );
  }

  const chartData = [
    { name: "Revenue", value: data.totalRevenue },
    { name: "Sold", value: data.totalTicketsSold },
    { name: "Added", value: data.totalTicketsAdded }
  ];

  return (
    <Container>
      <div className="my-10">

        {/* TITLE */}
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          Revenue Overview
        </h2>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-lime-500 text-white p-6 rounded-xl shadow-lg">
            <p className="text-sm uppercase tracking-wide opacity-90">
              Total Revenue
            </p>
            <h3 className="text-3xl font-bold mt-2">
              ৳ {data.totalRevenue}
            </h3>
          </div>

          <div className="bg-red-400 text-white p-6 rounded-xl shadow-lg">
            <p className="text-sm uppercase tracking-wide opacity-90">
              Tickets Sold
            </p>
            <h3 className="text-3xl font-bold mt-2">
              {data.totalTicketsSold}
            </h3>
          </div>

          <div className="bg-purple-400 text-white p-6 rounded-xl shadow-lg">
            <p className="text-sm uppercase tracking-wide opacity-90">
              Tickets Added
            </p>
            <h3 className="text-3xl font-bold mt-2">
              {data.totalTicketsAdded}
            </h3>
          </div>

        </div>

        {/* CHART CARD */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Sales Performance
          </h3>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#16a34a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </Container>
  );
};

export default MyInventory;

