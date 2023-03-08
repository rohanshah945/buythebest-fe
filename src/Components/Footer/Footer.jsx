import React from "react";
import { FaOpencart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="bg-gray-700 p-8 flex bottom-0">
      <div className="sm:w-1/2 h-auto justify-center items-center text-center text-white flex flex-col">
        <span>
          <FaOpencart className="text-white text-6xl mb-5" />
        </span>
        <span>1222 Saint Jones</span>
        <span>Street, NY</span>
        <span>USA 94435, USA</span>
      </div>

      <div className="sm:w-1/4 bg-gray-700 h-auto">
        <div className="text-white mb-2">Main Menu</div>
        <ul className="list-reset leading-normal">
          <li>
            <Link className="text-gray-300 hover:text-white" to="#">
              Products
            </Link>
          </li>
          <li>
            <Link className="text-gray-300 hover:text-white" to="#">
              Services
            </Link>
          </li>
          <li>
            <Link className="text-gray-300 hover:text-white" to="/support">
              Support
            </Link>
          </li>
          <li>
            <Link className="text-gray-300 hover:text-white" to="#">
              Deal
            </Link>
          </li>
          <li>
            <Link className="text-gray-300 hover:text-white" to="/cart">
              Cart
            </Link>
          </li>
        </ul>
      </div>

      <div className="sm:w-1/4 bg-gray-700 h-auto">
        <div className="text-white mb-2">Discover</div>
        <ul className="list-reset leading-normal">
          <li>
            <Link className="text-gray-300 hover:text-white" to="#">
              The Team
            </Link>
          </li>
          <li>
            <Link className="text-gray-300 hover:text-white" to="#">
              History
            </Link>
          </li>
          <li>
            <Link className="text-gray-300 hover:text-white" to="#">
              Brand Motto
            </Link>
          </li>
        </ul>
      </div>

      <div className="sm:w-1/4 bg-gray-700 h-auto">
        <div className="text-white mb-2">Find Us On</div>
        <ul className="list-reset leading-normal">
          <li>
            <Link className="text-gray-300 hover:text-white" to="#">
              Facebook
            </Link>
          </li>
          <li>
            <Link className="text-gray-300 hover:text-white" to="#">
              Twitter
            </Link>
          </li>
          <li>
            <Link className="text-gray-300 hover:text-white" to="#">
              Instagram
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
