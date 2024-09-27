import React, { useEffect, useState } from "react";
import { CiSearch, CiUser } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

function Header({ searchValue, setSearchValue, cartLength }) {
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { path: "/", label: "HOME" },
    { path: "/collection", label: "COLLECTION" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" },
  ];

  return (
    <>
      <header className="flex justify-between items-center py-5 px-4">
        <div className="text-[20px] md:text-[16px]">GIDADAO</div>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={
                    location.pathname === link.path
                      ? "text-primary-600 border-b-2 border-black pb-2 duration-200"
                      : "text-gray-700"
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <div className="flex space-x-4 cursor-pointer">
            <CiSearch
              onClick={() => {
                if (location.pathname === "/collection") {
                  setToggleSearch(true);
                  setSearchValue("");
                }
                navigate("/collection");
              }}
              className="w-5 h-5 md:w-6 md:h-6"
            />
            <CiUser className="w-5 h-5 md:w-6 md:h-6" />
            <div
              className="flex "
              onClick={() => {
                navigate("/cart");
              }}
            >
              <IoBagOutline className="w-5 h-5 md:w-6 md:h-6" />
              <p className="bg-black text-white h-5 w-5 text-center rounded-[100%] mt-3">
                {cartLength}
              </p>
            </div>
            <div className="block md:hidden">
              <FiMenu
                className="w-5 h-5 cursor-pointer"
                onClick={() => {
                  setToggle(true);
                }}
              />
            </div>
          </div>
        </div>
      </header>
      {location.pathname === "/collection" && (
        <div
          className={`flex justify-center item-center ${
            toggleSearch ? "block" : "hidden"
          } duration-150`}
        >
          <div>
            <input
              type="text"
              name="search"
              value={search}
              className="border-2 max-w-[600px] p-2 rounded-xl"
              onChange={(e) => {
                setSearch(e.target.value);
                setSearchValue(e.target.value);
              }}
            />
            <button className={`ml-3 text-xl`}>
              <IoCloseSharp
                onClick={() => {
                  setToggleSearch(false);
                  setSearchValue("");
                }}
              />
            </button>
          </div>
        </div>
      )}
      <div
        className={`duration-200 fixed top-0 bottom-0 bg-white ${
          toggle ? "w-full" : "w-0"
        } overflow-hidden z-10`}
      >
        <div onClick={() => setToggle(false)}>
          <div className="flex gap-2 items-center cursor-pointer py-4">
            <IoIosArrowBack className="text-gray-400 text-2xl" />
            Back
          </div>
          <div>
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-4 px-4 text-sm font-medium border-y-[1px] ${
                  location.pathname === link.path ? "bg-black text-white " : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Header;
