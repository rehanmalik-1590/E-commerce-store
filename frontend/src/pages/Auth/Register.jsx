import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";

const Register = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return; // Prevent further execution if passwords don't match
        }

        try {
            const res = await register({ username, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
            toast.success("User successfully registered");
        } catch (error) {
            console.error(error);
            toast.error(error.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <section className="flex flex-col items-center justify-center w-full max-w-5xl p-4 md:flex-row">
                {/* Form Section */}
                <div className="flex flex-col items-start w-full md:w-1/2">
                    <h1 className="text-3xl font-bold mb-4 text-white">Register</h1>
                    <form onSubmit={submitHandler} className="w-full max-w-md">
                        {/* Name Field */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-white">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="mt-2 p-3 border rounded w-full text-black"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-white">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-2 p-3 border rounded w-full text-black"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-white">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="mt-2 p-3 border rounded w-full text-black"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your Password"
                                required
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="mt-2 p-3 border rounded w-full text-black"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="relative mt-4 bg-blue-500 text-white px-6 py-2 rounded w-full hover:bg-blue-600 transition"
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </button>

                        {/* Loader */}
                        {isLoading && <Loader />}
                    </form>

                    {/* Login Link */}
                    <div className="mt-4">
                        <p className="text-white">
                            Already have an account?{" "}
                            <Link
                                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                                className="text-pink-500 hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;
