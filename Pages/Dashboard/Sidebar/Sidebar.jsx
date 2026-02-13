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

  const profileLink =
    user.role === "seller"
      ? { name: "Profile", path: "/dashboard/seller-profile", icon: <TbUser /> }
      : user.role === "buyer"
      ? { name: "Profile", path: "/dashboard/buyer-profile", icon: <TbUser /> }
      : { name: "Profile", path: "/dashboard/admin-profile", icon: <TbUser /> };

  const sellerLinks = [
    { name: "Add Ticket", path: "/dashboard/add-ticket", icon: <FiPlus /> },
    { name: "My Added Tickets", path: "/dashboard/my-added-tickets", icon: <TbTicket /> },
    { name: "Requested Bookings", path: "/dashboard/requested-bookings", icon: <AiOutlineOrderedList /> },
    { name: "Revenue Overview", path: "/dashboard/my-inventory", icon: <TbChartPie /> },
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

  let links = [profileLink];
  if (user.role === "seller") links = [...links, ...sellerLinks];
  if (user.role === "admin") links = [...links, ...adminLinks];
  if (user.role === "buyer") links = [...links, ...buyerLinks];

  return (
    <div
      className={`
        bg-gray-100 border-gray-300 transition-all 
        md:h-screen md:p-5 md:border-r 
        flex md:flex-col items-center md:items-start
        gap-2 md:gap-3
        ${isOpen ? "w-full md:w-64" : "w-full md:w-20"}
        overflow-x-auto md:overflow-x-visible
      `}
    >
      <button
        className="hidden md:block mb-3 px-2 py-1 bg-gray-300 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? "Collapse" : "Expand"}
      </button>

      <nav
        className={`
          flex flex-row md:flex-col gap-2 md:gap-3 w-full
          overflow-x-auto md:overflow-x-visible
        `}
      >
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md text-gray-700 hover:bg-gray-200 
              ${isActive ? "bg-gray-300 font-semibold" : ""}`
            }
          >
            <span className="text-xl">{link.icon}</span>
            {isOpen && <span className="whitespace-nowrap">{link.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto w-45 md:mt-auto">
        <Button
          label="Home"
          icon={TbHome}
          outline={true}
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};

export default Sidebar;