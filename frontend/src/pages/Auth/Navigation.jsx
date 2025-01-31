import React, { useState } from "react";
import {
    AiOutlineHome,
    AiOutlineShopping,
    AiOutlineLogin,
    AiOutlineUserAdd,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const {cartItems} = useSelector((state) => state.cart);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const closeSidebar = () => {
        setShowSidebar(false);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            style={{ zIndex: 999 }}
            className={`${showSidebar ? "hidden" : "flex"} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
            id="navigation-container"
        >
            <div className="flex flex-col justify-center space-y-3">
                <Link
                    to="/"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <AiOutlineHome className="mr-2 mt-[2rem]" size={26} />
                    <span className="hidden nav-item-name mt-[2rem]">HOME</span>{" "}
                </Link>

                <Link
                    to="/shop"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <AiOutlineShopping className="mr-2 mt-[2rem]" size={26} />
                    <span className="hidden nav-item-name mt-[2rem]">SHOP</span>{" "}
                </Link>

                <Link
                    to="/cart"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <AiOutlineShoppingCart className="mr-2 mt-[2rem]" size={26} />
                    <span className="hidden nav-item-name mt-[2rem]">CART</span>{" "}

                    <div className="absolute left-2 top-5">
                        {cartItems.length > 0 && (
                            <span>
                                <span className="px-1 py-0 cursor-pointer flex justify-center text-sm items-center w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 shadow-lg transform transition-transform duration-300 hover:scale-125">
                                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                </span>
                            </span>
                        )}
                    </div>
                </Link>

                <Link
                    to="/favorite"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <FaHeart className="mr-2 mt-[2rem]" size={26} />
                    <span className="hidden nav-item-name mt-[2rem]">FAVORITE</span>{" "}
                    <FavoritesCount/>
                </Link>
            </div>

            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="flex items-center text-gray-800 focus:outline-none"
                >
                    {userInfo ? (
                        <span className="text-white">{userInfo.username}</span>
                    ) : (
                        <></>
                    )}

                    {userInfo && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ml-1 ${
                                dropdownOpen ? "transform rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={
                                    dropdownOpen
                                        ? "M5 15l7-7 7 7"
                                        : "M19 9l-7 7-7-7"
                                }
                            />
                        </svg>
                    )}
                </button>

                {dropdownOpen && userInfo && (
                    <ul
                        className={`absolute bg-gray-400 text-white p-1 rounded shadow-md`}
                        style={{
                            top: "auto",
                            bottom: "100%",
                            right: userInfo.isAdmin ? "-45%" : "-50%",
                            minWidth: "10rem",
                            zIndex: 50,
                            backgroundColor: "rgba(255, 255, 255, 0.1)", // Soft translucent white
                            backdropFilter: "blur(8px)", // Adds a subtle blur effect
                            border: "1px solid rgba(255, 255, 255, 0.2)", // Light border for contrast
                            wordSpacing: "0.2rem",
                        }}
                    >
                        {userInfo.isAdmin ? (
                            <>
                                {[
                                    { label: "Dashboard", path: "/admin/dashboard" },
                                    { label: "Products", path: "/admin/productlist" },
                                    { label: "Category", path: "/admin/categorylist" },
                                    { label: "Orders", path: "/admin/orderlist" },
                                    { label: "Users", path: "/admin/userlist" },
                                    { label: "Profile", path: "/profile" },
                                ].map((item, index) => (
                                    <li
                                        key={index}
                                        className={`block px-4 py-2 hover:bg-gray-400`}
                                        style={{
                                            marginBottom: "0.5rem", // Add consistent spacing between items
                                        }}
                                    >
                                        <Link to={item.path}>{item.label}</Link>
                                    </li>
                                ))}
                                <li
                                    className={`block px-4 py-2 hover:bg-gray-400`}
                                    style={{
                                        marginTop: "1rem", // Additional spacing for Logout
                                    }}
                            >
                                <button
                                    onClick={logoutHandler}
                                    className="block w-full text-left"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 hover:bg-gray-400"
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={logoutHandler}
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-400"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
                
                )}
            </div>

            {!userInfo && (
                <ul>
                    <li>
                        <Link
                            to="/login"
                            className="flex items-center transition-transform transform hover:translate-x-2"
                        >
                            <AiOutlineLogin
                                className="mr-2 mt-[3rem]"
                                size={26}
                            />
                            <span className="hidden nav-item-name mt-[3rem]">
                                Login
                            </span>{" "}
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/register"
                            className="flex items-center transition-transform transform hover:translate-x-2"
                        >
                            <AiOutlineUserAdd
                                className="mr-2 mt-[3rem]"
                                size={26}
                            />
                            <span className="hidden nav-item-name mt-[3rem]">
                                Register
                            </span>{" "}
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Navigation;
