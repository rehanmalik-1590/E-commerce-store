import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Handle body scroll lock
    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                className={`${
                    isMenuOpen ? "top-5 right-5" : "top-5 right-5"
                } bg-[#3d3d3e] p-2 fixed rounded-lg z-50 transition-all duration-300`}
                onClick={toggleMenu}
            >
                {isMenuOpen ? (
                    <FaTimes color="white" size={24} />
                ) : (
                    <>
                        <div className="w-6 h-0.5 bg-white my-1"></div>
                        <div className="w-6 h-0.5 bg-white my-1"></div>
                        <div className="w-6 h-0.5 bg-white my-1"></div>
                    </>
                )}
            </button>

            {/* Side Menu */}
            <div
                className={`fixed inset-y-0 right-0 bg-[#3d3d3e] shadow-lg z-40 transition-transform duration-300 overflow-y-auto ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                } w-[250px]`} // Fixed width across all screen sizes
            >
                <ul className="list-none mt-5 p-4">
                    <li>
                        <NavLink
                            className="py-2 px-3 block mb-3 hover:bg-[#2E2D2D] rounded-sm"
                            to="/admin/dashboard"
                            style={({ isActive }) => ({
                                color: isActive ? "greenyellow" : "white",
                            })}
                        >
                            Admin Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="py-2 px-3 block mb-3 hover:bg-[#2E2D2D] rounded-sm"
                            to="/admin/dashboard"
                            style={({ isActive }) => ({
                                color: isActive ? "greenyellow" : "white",
                            })}
                        >
                            Admin Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="py-2 px-3 block mb-3 hover:bg-[#2E2D2D] rounded-sm"
                            to="/admin/categorylist"
                            style={({ isActive }) => ({
                                color: isActive ? "greenyellow" : "white",
                            })}
                        >
                            Create Category
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="py-2 px-3 block mb-3 hover:bg-[#2E2D2D] rounded-sm"
                            to="/admin/productlist"
                            style={({ isActive }) => ({
                                color: isActive ? "greenyellow" : "white",
                            })}
                        >
                            Create Product
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="py-2 px-3 block mb-3 hover:bg-[#2E2D2D] rounded-sm"
                            to="/admin/allproductslist"
                            style={({ isActive }) => ({
                                color: isActive ? "greenyellow" : "white",
                            })}
                        >
                            All Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="py-2 px-3 block mb-3 hover:bg-[#2E2D2D] rounded-sm"
                            to="/admin/userlist"
                            style={({ isActive }) => ({
                                color: isActive ? "greenyellow" : "white",
                            })}
                        >
                            Manage Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="py-2 px-3 block mb-3 hover:bg-[#2E2D2D] rounded-sm"
                            to="/admin/orderlist"
                            style={({ isActive }) => ({
                                color: isActive ? "greenyellow" : "white",
                            })}
                        >
                            Manage Orders
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Background Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={toggleMenu}
                ></div>
            )}
        </>
    );
};

export default AdminMenu;
