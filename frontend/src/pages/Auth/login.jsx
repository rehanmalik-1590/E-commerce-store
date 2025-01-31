import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

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

        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success("Login successful!");
            navigate(redirect);
        } catch (error) {
            toast.error(error?.data?.message || "Failed to log in. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <section className="flex flex-col items-center justify-center w-full max-w-5xl p-4">
                {/* Form Section */}
                <div className="flex flex-col items-start w-full md:w-1/2">
                    <h1 className="text-3xl font-bold mb-4 text-white">Sign In</h1>
                    <form onSubmit={submitHandler} className="w-full">
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
                                placeholder="Enter your password"
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="relative mt-4 bg-blue-500 text-white px-6 py-2 rounded w-full hover:bg-blue-600 transition"
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </button>

                        {isLoading && <Loader />}
                    </form>

                    <div className="mt-4">
                        <p className="text-white">
                            New Customer?{" "}
                            <Link
                                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                                className="text-pink-500 hover:underline"
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
