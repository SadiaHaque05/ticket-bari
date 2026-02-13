import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../src/assets/placeholder.jpg";
import { IoTicketSharp } from "react-icons/io5";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed w-full bg-gray-100 z-10 shadow-sm">
      <div className="py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Link to="/">
              <div className="flex items-center justify-center gap-1 text-gray-900 font-bold">
                <IoTicketSharp size={24} />
                <p>TicketBari</p>
              </div>
            </Link>
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 md:py-1 md:px-2 border border-gray-300 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition bg-white"
                >
                  <AiOutlineMenu className="text-gray-700" />
                  <div className="hidden md:block">
                    <img
                      className="rounded-full border border-gray-300"
                      referrerPolicy="no-referrer"
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt="profile"
                      height="30"
                      width="30"
                    />
                  </div>
                </div>
              </div>

              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[12vw] bg-white overflow-hidden right-0 top-12 text-sm border border-gray-200">
                  <div className="flex flex-col cursor-pointer">
                    <Link
                      to="/"
                      className="block md:hidden px-4 py-3 hover:bg-gray-200 transition font-semibold text-gray-900"
                    >
                      Home
                    </Link>

                    {user ? (
                      <>
                        <Link
                          to="/dashboard"
                          className="px-4 py-3 hover:bg-gray-200 transition font-semibold text-gray-900"
                        >
                          Dashboard
                        </Link>

                        <Link
                          to="/tickets"
                          className="px-4 py-3 hover:bg-gray-200 transition font-semibold text-gray-900"
                        >
                          All Tickets
                        </Link>

                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-gray-200 transition font-semibold cursor-pointer text-gray-900"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-gray-200 transition font-semibold text-gray-900"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3 hover:bg-gray-200 transition font-semibold text-gray-900"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;