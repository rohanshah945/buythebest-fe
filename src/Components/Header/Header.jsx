import React, { useContext } from "react";
import { FaOpencart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { REMOVE_USER } from "../../Config/constants";
import { UserContext } from "../../Store/UserContext";
import "./Header.css";

function Header() {
  const {
    user: { user, cart },
    userDispatch,
  } = useContext(UserContext);

  const signOut = () => {
    userDispatch({
      type: REMOVE_USER,
    });
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-700 p-4">
      <Link to="/" className="flex items-center flex-shrink-0 text-white mr-6">
        <FaOpencart className="fill-current h-8 w-8 mr-2" />
        <span className="font-semibold text-xl tracking-tight">BuyTheBest</span>
      </Link>
      <div className="flex-1"></div>
      <div className="flex items-center ">
        <div className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4">
          Products
        </div>
        <div className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4">
          Services
        </div>
        <Link
          to="/support"
          className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
        >
          Support
        </Link>
        <Link
          to="/orders"
          className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
        >
          Orders
        </Link>
        <Link
          to="/cart"
          className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
        >
          {cart.length ? `Cart (${cart.length})` : `Cart`}
        </Link>
        {user?.name ? (
          <div className="dropdown inline-block ">
            <button className="text-white rounded inline-flex items-start">
              <span className="mr-1">{user.name}</span>
            </button>
            <ul className="dropdown-menu right-4 absolute hidden text-gray-700 pt-1">
              <li className="">
                <Link
                  to="/profile"
                  className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                >
                  Profile
                </Link>
              </li>
              <li className="">
                <button
                  className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                  onClick={() => signOut()}
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="block mt-4 mr-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4">
            <Link to="/login">Sign In</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
