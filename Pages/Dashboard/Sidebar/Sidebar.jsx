import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { TbTicket, TbUser, TbChartPie, TbHome } from "react-icons/tb";
import { FiPlus, FiUsers, FiCreditCard } from "react-icons/fi";
import { AiOutlineOrderedList } from "react-icons/ai";
import Button from "../../../components/shared/Button/Button";

const Sidebar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  if (!user) return null;

  const toggleSidebar = () => setIsOpen(!isOpen);

  const commonLinks = [
    { name: "Profile", path: "/dashboard/profile", icon: <TbUser /> },
  ];

  const sellerLinks = [
    { name: "Add Ticket", path: "/dashboard/add-ticket", icon: <FiPlus /> },
    { name: "My Added Tickets", path: "/dashboard/my-added-tickets", icon: <TbTicket /> },
    { name: "Requested Bookings", path: "/dashboard/requested-bookings", icon: <AiOutlineOrderedList /> },
    { name: "Revenue Overview", path: "/dashboard/revenue-overview", icon: <TbChartPie /> },
  ];

  const adminLinks = [
    { name: "Manage Tickets", path: "/dashboard/manage-tickets", icon: <TbTicket /> },
    { name: "Manage Users", path: "/dashboard/manage-users", icon: <FiUsers /> },
    { name: "Advertise Tickets", path: "/dashboard/advertise-tickets", icon: <FiCreditCard /> },
  ];

  const buyerLinks = [
    { name: "My Booked Tickets", path: "/dashboard/my-booked-tickets", icon: <TbTicket /> },
    { name: "Transaction History", path: "/dashboard/transaction-history", icon: <FiCreditCard /> },
  ];

  // Determine links based on role
  let links = [...commonLinks];
  if (user.role === "seller") links = [...links, ...sellerLinks];
  if (user.role === "admin") links = [...links, ...adminLinks];
  if (user.role === "buyer") links = [...links, ...buyerLinks];

  return (
    <div
      className={`bg-gray-100 h-screen p-5 border-r border-gray-300 transition-all ${isOpen ? "w-64" : "w-20"}`}
    >
      <button
        className="mb-5 px-2 py-1 bg-gray-300 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? "Collapse" : "Expand"}
      </button>

      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md text-gray-700 hover:bg-gray-200 ${
                isActive ? "bg-gray-300 font-semibold" : ""
              }`
            }
          >
            <span className="text-xl">{link.icon}</span>
            {isOpen && <span>{link.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Go Back Home Button at Bottom */}
      <div className="mt-auto">
        <Button
          label="Go Back Home"
          icon={TbHome}
          outline={true}
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};

export default Sidebar;
